package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/smtp"
	"os"
	"path/filepath"

	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
)

func MakeBody(to string, subject string, body string) string {
	return fmt.Sprintf("To: %s\r\nSubject%s\r\n\r\n%s", to, subject, body)
}

func main() {
	r := chi.NewRouter()

	// API routes
	r.Route("/api", func(r chi.Router) {
		r.Use(setContentType)
		// CORSを有効にする
		cors := cors.New(cors.Options{
			AllowedOrigins:   []string{"http://localhost:3000"},
			AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
			ExposedHeaders:   []string{"Link"},
			AllowCredentials: true,
			MaxAge:           300, // Maximum value not ignored by any of major browsers
		})
		r.Use(cors.Handler)
		r.Post("/mail", func(w http.ResponseWriter, r *http.Request) {

			// リクエストボディを取得
			var reqBody map[string]string
			if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
				w.WriteHeader(http.StatusBadRequest)
				w.Write([]byte(err.Error()))
				return
			}

			// リクエストボディからメール情報を取得
			mailFrom := reqBody["mail_from"]
			mailTo := reqBody["mail_to"]
			mailSubject := reqBody["mail_subject"]
			mailBody := reqBody["mail_body"]
			SMTPServer := reqBody["smtp_server"]
			SMTPPort := reqBody["smtp_port"]
			SMTPUser := reqBody["smtp_user"]
			SMTPPassword := reqBody["smtp_password"]

			// メール送信
			smtpSvr := SMTPServer + ":" + SMTPPort
			auth := smtp.PlainAuth("", SMTPUser, SMTPPassword, SMTPServer)
			if err := smtp.SendMail(smtpSvr, auth, mailFrom, []string{mailTo}, []byte(MakeBody(mailTo, mailSubject, mailBody))); err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				w.Write([]byte(err.Error()))
				return
			}
			w.WriteHeader(http.StatusOK)
		})
	})

	// Serve static files
	workDir, _ := os.Getwd()
	filesDir := http.Dir(filepath.Join(workDir, "web"))
	r.Handle("/*", http.StripPrefix("/", http.FileServer(filesDir)))

	http.ListenAndServe(":80", r)
}

func setContentType(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}
