package app

import (
	"github.com/caarlos0/env/v10"
	"github.com/dashotv/fae"
)

func setupConfig(app *Application) error {
	app.Config = &Config{}
	if err := env.Parse(app.Config); err != nil {
		return fae.Wrap(err, "parsing config")
	}

	if err := app.Config.Validate(); err != nil {
		return fae.Wrap(err, "failed to validate config")
	}

	return nil
}

type Config struct {
	Mode   string `env:"MODE" envDefault:"dev"`
	Logger string `env:"LOGGER" envDefault:"dev"`
	Port   int    `env:"PORT" envDefault:"10080"`
	//golem:template:app/config_partial_struct
	// DO NOT EDIT. This section is managed by github.com/dashotv/golem.

	//golem:template:app/config_partial_struct

}

func (c *Config) Validate() error {
	list := []func() error{
		c.validateMode,
		c.validateLogger,
		//golem:template:app/config_partial_validate
		// DO NOT EDIT. This section is managed by github.com/dashotv/golem.
		//golem:template:app/config_partial_validate

	}

	for _, fn := range list {
		if err := fn(); err != nil {
			return err
		}
	}

	return nil
}

func (c *Config) validateMode() error {
	switch c.Mode {
	case "dev", "release":
		return nil
	default:
		return fae.New("invalid mode (must be 'dev' or 'release')")
	}
}

func (c *Config) validateLogger() error {
	switch c.Logger {
	case "dev", "release":
		return nil
	default:
		return fae.New("invalid logger (must be 'dev' or 'release')")
	}
}

//golem:template:app/config_partial_connection
// DO NOT EDIT. This section is managed by github.com/dashotv/golem.

//golem:template:app/config_partial_connection
