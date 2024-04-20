package app

import (
	"context"

	"github.com/labstack/echo/v4"
	"go.uber.org/zap"

	"github.com/dashotv/fae"
)

var app *Application

type setupFunc func(app *Application) error
type healthFunc func(app *Application) error

var initializers = []setupFunc{setupConfig, setupLogger}
var healthchecks = map[string]healthFunc{}
var starters = []func(ctx context.Context, app *Application) error{}

type Application struct {
	Config *Config
	Log    *zap.SugaredLogger

	//golem:template:app/app_partial_definitions
	// DO NOT EDIT. This section is managed by github.com/dashotv/golem.
	// Routes
	Engine  *echo.Echo
	Default *echo.Group
	Router  *echo.Group

	// Models
	DB *Connector

	//golem:template:app/app_partial_definitions

}

func Setup() error {
	if app != nil {
		return fae.New("application already setup")
	}

	app = &Application{}

	for _, f := range initializers {
		if err := f(app); err != nil {
			return err
		}
	}

	return nil
}

func Start() error {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	if app == nil {
		if err := Setup(); err != nil {
			return err
		}
	}

	// app.Engine.Debug = true
	// app.Engine.Use(middleware.BodyDump(func(c echo.Context, reqBody, resBody []byte) {
	// 	app.Log.Debug("request", zap.String("request", string(reqBody)), zap.String("response", string(resBody)))
	// }))

	for _, f := range starters {
		if err := f(ctx, app); err != nil {
			return err
		}
	}

	app.Log.Info("started")

	for {
		select {
		case <-ctx.Done():
			app.Log.Info("stopping")
			return nil
		}
	}
}

func (a *Application) Health() (map[string]bool, error) {
	resp := make(map[string]bool)
	for n, f := range healthchecks {
		err := f(a)
		resp[n] = err == nil
	}

	return resp, nil
}
