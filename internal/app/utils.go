package app

import (
	"time"
)

// WithTimeout runs a delegate function with a timeout,
//
// Example: Wait for a channel
//
//	if value, ok := WithTimeout(func()interface{}{return <- inbox}, time.Second); ok {
//	    // returned
//	} else {
//	    // didn't return
//	}
//
// Example: To send to a channel
//
//	_, ok := WithTimeout(func()interface{}{outbox <- myValue; return nil}, time.Second)
//	if !ok {
//	    // didn't send
//	}
func WithTimeout(delegate func() interface{}, timeout time.Duration) (ret interface{}, ok bool) {
	ch := make(chan interface{}, 1) // buffered
	go func() { ch <- delegate() }()
	select {
	case ret = <-ch:
		return ret, true
	case <-time.After(timeout):
	}
	return nil, false
}
