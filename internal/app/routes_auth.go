package app

import (
	"context"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

// GET /auth/google
func (a *Application) AuthGoogle(c echo.Context) error {
	oauthState, cookie := a.Gmail.generateStateOauthCookie()
	c.SetCookie(cookie)

	authURL := a.Gmail.AuthCodeURL(oauthState)
	return c.Redirect(302, authURL)
}

// GET /auth/google/callback
func (a *Application) AuthGoogleCallback(c echo.Context, state string, code string, scope string) error {
	oauthState, err := c.Cookie("oauthstate")
	if err != nil {
		return c.JSON(http.StatusBadRequest, &Response{Error: true, Message: "Failed to read oauth state cookie"})
	}

	if state != oauthState.Value {
		return c.JSON(http.StatusBadRequest, &Response{Error: true, Message: "Invalid oauth state"})
	}

	a.Log.Debugf("AuthGoogle: state=%s code=%s scope=%s", state, code, scope)
	tok, err := a.Gmail.Exchange(context.Background(), code)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, &Response{Error: true, Message: fmt.Sprintf("getting token: %v", err)})
	}

	a.Log.Debugf("Token: %+v\n", tok)

	return c.JSON(http.StatusOK, &Response{Error: false, Message: "ok"})
}
