package app

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

// GET /email/
func (a *Application) EmailIndex(c echo.Context, page int, limit int) error {
	list, err := a.DB.EmailList(page, limit)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, &Response{Error: true, Message: "error loading Email"})
	}
	return c.JSON(http.StatusOK, &Response{Error: false, Result: list})
}

// POST /email/
func (a *Application) EmailCreate(c echo.Context, subject *Email) error {
	// TODO: process the subject
	if err := a.DB.Email.Save(subject); err != nil {
		return c.JSON(http.StatusInternalServerError, &Response{Error: true, Message: "error saving Email"})
	}
	return c.JSON(http.StatusOK, &Response{Error: false, Result: subject})
}

// GET /email/:id
func (a *Application) EmailShow(c echo.Context, id string) error {
	subject, err := a.DB.EmailGet(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, &Response{Error: true, Message: "not found"})
	}
	return c.JSON(http.StatusOK, &Response{Error: false, Result: subject})
}

// PUT /email/:id
func (a *Application) EmailUpdate(c echo.Context, id string, subject *Email) error {
	// TODO: process the subject

	// if you need to copy or compare to existing object...
	// data, err := a.DB.EmailGet(id)
	// if err != nil {
	//     return c.JSON(http.StatusInternalServerError, &Response{Error: true, Message: "not found"})
	// }
	// data.Name = subject.Name ...
	if err := a.DB.Email.Save(subject); err != nil {
		return c.JSON(http.StatusInternalServerError, &Response{Error: true, Message: "error saving Email"})
	}
	return c.JSON(http.StatusOK, &Response{Error: false, Result: subject})
}

// PATCH /email/:id
func (a *Application) EmailSettings(c echo.Context, id string, setting *Setting) error {
	subject, err := a.DB.EmailGet(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, &Response{Error: true, Message: "not found"})
	}

	// switch Setting.Name {
	// case "something":
	//    subject.Something = Setting.Value
	// }

	if err := a.DB.Email.Save(subject); err != nil {
		return c.JSON(http.StatusInternalServerError, &Response{Error: true, Message: "error saving Email"})
	}
	return c.JSON(http.StatusOK, &Response{Error: false, Result: subject})
}

// DELETE /email/:id
func (a *Application) EmailDelete(c echo.Context, id string) error {
	subject, err := a.DB.EmailGet(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, &Response{Error: true, Message: "not found"})
	}
	if err := a.DB.Email.Delete(subject); err != nil {
		return c.JSON(http.StatusInternalServerError, &Response{Error: true, Message: "error deleting Email"})
	}
	return c.JSON(http.StatusOK, &Response{Error: false, Result: subject})
}
