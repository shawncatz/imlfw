package app

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"net/http"
	"time"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/gmail/v1"
	"google.golang.org/api/option"

	"github.com/dashotv/fae"
)

func init() {
	initializers = append(initializers, setupGmail)
	starters = append(starters, startGmail)
}

func setupGmail(a *Application) error {
	config := &oauth2.Config{
		ClientID:     a.Config.GmailClientID,
		ClientSecret: a.Config.GmailClientSecret,
		RedirectURL:  a.Config.GmailRedirectURIs[0],
		Scopes:       []string{"https://www.googleapis.com/auth/gmail.readonly"},
		Endpoint:     google.Endpoint,
	}

	a.Gmail = &Gmail{
		config: config,
	}
	return nil
}

func startGmail(ctx context.Context, a *Application) error {
	t := a.Config.GmailToken
	if t == "" {
		a.Log.Warn("Gmail token is empty")
		return nil
	}

	tok, err := a.Gmail.config.Exchange(ctx, t)
	if err != nil {
		return fae.Wrap(err, "Unable to retrieve token from web")
	}

	client := a.Gmail.config.Client(ctx, tok)
	a.Gmail.client = client

	srv, err := gmail.NewService(ctx, option.WithHTTPClient(client))
	if err != nil {
		return fae.Wrap(err, "Unable to retrieve Gmail client")
	}
	a.Gmail.service = srv

	return nil
}

type Gmail struct {
	config  *oauth2.Config
	client  *http.Client
	service *gmail.Service
	token   *oauth2.Token
}

func (g *Gmail) generateStateOauthCookie() (string, *http.Cookie) {
	var expiration = time.Now().Add(365 * 24 * time.Hour)

	b := make([]byte, 16)
	rand.Read(b)
	state := base64.URLEncoding.EncodeToString(b)
	cookie := &http.Cookie{Name: "oauthstate", Value: state, Expires: expiration}

	return state, cookie
}

func (g *Gmail) AuthCodeURL(state string) string {
	return g.config.AuthCodeURL(state)
}
func (g *Gmail) Exchange(ctx context.Context, code string) (*oauth2.Token, error) {
	return g.config.Exchange(ctx, code)
}

// func AuthorizeGmail() (*oauth2.Token, error) {
// 	err := Setup()
// 	if err != nil {
// 		return nil, err
// 	}
//
// 	tok := getTokenFromWeb(app.Gmail.config)
// 	return tok, nil
// }

// // Retrieve a token, saves the token, then returns the generated client.
// func getClient(config *oauth2.Config) *http.Client {
// 	// The file token.json stores the user's access and refresh tokens, and is
// 	// created automatically when the authorization flow completes for the first
// 	// time.
// 	// tokFile := "token.json"
// 	// tok, err := tokenFromFile(tokFile)
// 	// if err != nil {
// 	tok := getTokenFromWeb(config)
// 	// saveToken(tokFile, tok)
// 	// }
// 	return config.Client(context.Background(), tok)
// }
//
// // Request a token from the web, then returns the retrieved token.
// func getTokenFromWeb(config *oauth2.Config) *oauth2.Token {
// 	authURL := config.AuthCodeURL("state-token", oauth2.AccessTypeOnline)
// 	fmt.Printf("Go to the following link in your browser then type the "+
// 		"authorization code: \n%v\n", authURL)
//
// 	var authCode string
// 	if _, err := fmt.Scan(&authCode); err != nil {
// 		log.Fatalf("Unable to read authorization code: %v", err)
// 	}
//
// 	tok, err := config.Exchange(context.TODO(), authCode)
// 	if err != nil {
// 		log.Fatalf("Unable to retrieve token from web: %v", err)
// 	}
// 	return tok
// }
//
// // Retrieves a token from a local file.
// func tokenFromFile(file string) (*oauth2.Token, error) {
// 	f, err := os.Open(file)
// 	if err != nil {
// 		return nil, err
// 	}
// 	defer f.Close()
// 	tok := &oauth2.Token{}
// 	err = json.NewDecoder(f).Decode(tok)
// 	return tok, err
// }
//
// // Saves a token to a file path.
// func saveToken(path string, token *oauth2.Token) {
// 	fmt.Printf("Saving credential file to: %s\n", path)
// 	f, err := os.OpenFile(path, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0600)
// 	if err != nil {
// 		log.Fatalf("Unable to cache oauth token: %v", err)
// 	}
// 	defer f.Close()
// 	json.NewEncoder(f).Encode(token)
// }
