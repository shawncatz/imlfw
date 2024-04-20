package app

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

// GET /hooks/zapier
func (a *Application) HooksZapier(c echo.Context, payload *ZapierRequest) error {
	email := payload.Payload
	if email == nil {
		return c.JSON(http.StatusBadRequest, &Response{Error: true, Message: "Invalid payload"})
	}
	if err := a.DB.Email.Save(email); err != nil {
		return c.JSON(http.StatusInternalServerError, &Response{Error: true, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, &Response{Error: false, Message: "OK"})
}
