package app

func (c *Connector) EmailGet(id string) (*Email, error) {
	m := &Email{}
	err := c.Email.Find(id, m)
	if err != nil {
		return nil, err
	}

	// post process here

	return m, nil
}

func (c *Connector) EmailList(page, limit int) ([]*Email, error) {
	skip := (page - 1) * limit
	list, err := c.Email.Query().Limit(limit).Skip(skip).Run()
	if err != nil {
		return nil, err
	}

	return list, nil
}
