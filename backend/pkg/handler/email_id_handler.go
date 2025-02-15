package handler

import (
	"net/http"

	"github.com/desicatalyst/pkg/db"
	"github.com/desicatalyst/pkg/helper"
)

func EmailIDHandler(w http.ResponseWriter, r *http.Request) {
	l := helper.GetLogger()

	emailId := r.URL.Query().Get("emailId")
	if emailId == "" {
		l.Error("emailId is required")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err := db.Instance.InsertEmail(emailId)
	if err != nil {
		l.Error("error while inserting email", "error", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	l.Info("emailId inserted successfully " + emailId)
	w.WriteHeader(http.StatusOK)
}
