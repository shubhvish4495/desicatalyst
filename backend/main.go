package main

import (
	"net/http"

	"github.com/desicatalyst/pkg/db"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	"github.com/desicatalyst/pkg/handler"
	"github.com/desicatalyst/pkg/helper"
)

func main() {

	//set up logger
	helper.SetupLogger()
	l := helper.GetLogger()

	l.Info("setting up database")
	err := db.InitDB()
	if err != nil {
		l.Error("error setting up database", "error", err)
		panic(err)
	}

	err = db.Instance.Ping()
	if err != nil {
		l.Error("error pinging database", "error", err)
		panic(err)
	}

	l.Info("starting server")
	r := mux.NewRouter()
	r.HandleFunc("/email_signup", handler.EmailIDHandler).Methods("POST")

	// Enable CORS for all origins (change as needed)
	corsHandler := handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),                             // Allow all origins, change this for security
		handlers.AllowedMethods([]string{"POST", "GET", "OPTIONS"}),        // Allow required methods
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}), // Allow specific headers
	)(r)

	port := "4444"
	l.Info("Server running on port " + port)
	err = http.ListenAndServe(":"+port, corsHandler)
	if err != nil {
		l.Error("Error starting server", "error", err)
		panic(err)
	}

}
