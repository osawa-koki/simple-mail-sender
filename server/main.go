package main

import (
	"encoding/json"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
)

type Lang struct {
	Name string `json:"name"`
	Birthday time.Time `json:"birthday"`
	On_trend bool `json:"on_trend"`
}

func apiIndex(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(map[string]string{"text": "I am a GET man."})
}

func apiCreate(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(map[string]string{"text": "I am a POST man."})
}

func apiUpdate(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(map[string]string{"text": "I am a PUT man."})
}

func apiDelete(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(map[string]string{"text": "I am a DELETE man."})
}

func apiLang(w http.ResponseWriter, r *http.Request) {
	var langs []Lang = []Lang{
		{Name: "Go", Birthday: time.Date(2009, time.November, 10, 23, 0, 0, 0, time.UTC), On_trend: true},
		{Name: "Rust", Birthday: time.Date(2010, time.May, 15, 23, 0, 0, 0, time.UTC), On_trend: true},
		{Name: "C", Birthday: time.Date(1972, time.June, 1, 23, 0, 0, 0, time.UTC), On_trend: false},
		{Name: "C++", Birthday: time.Date(1983, time.December, 1, 23, 0, 0, 0, time.UTC), On_trend: false},
		{Name: "Java", Birthday: time.Date(1995, time.May, 23, 23, 0, 0, 0, time.UTC), On_trend: false},
		{Name: "Python", Birthday: time.Date(1991, time.February, 20, 23, 0, 0, 0, time.UTC), On_trend: true},
		{Name: "Ruby", Birthday: time.Date(1995, time.December, 21, 23, 0, 0, 0, time.UTC), On_trend: false},
		{Name: "JavaScript", Birthday: time.Date(1995, time.December, 4, 23, 0, 0, 0, time.UTC), On_trend: true},
		{Name: "PHP", Birthday: time.Date(1995, time.June, 8, 23, 0, 0, 0, time.UTC), On_trend: false},
		{Name: "C#", Birthday: time.Date(2000, time.November, 13, 23, 0, 0, 0, time.UTC), On_trend: false},
		{Name: "Swift", Birthday: time.Date(2014, time.June, 2, 23, 0, 0, 0, time.UTC), On_trend: true},
		{Name: "Kotlin", Birthday: time.Date(2011, time.February, 15, 23, 0, 0, 0, time.UTC), On_trend: true},
		{Name: "Dart", Birthday: time.Date(2011, time.June, 10, 23, 0, 0, 0, time.UTC), On_trend: true},
		{Name: "R", Birthday: time.Date(1993, time.October, 1, 23, 0, 0, 0, time.UTC), On_trend: true},
		{Name: "Scala", Birthday: time.Date(2003, time.February, 20, 23, 0, 0, 0, time.UTC), On_trend: true},
		{Name: "Elixir", Birthday: time.Date(2011, time.June, 23, 23, 0, 0, 0, time.UTC), On_trend: true},
		{Name: "Clojure", Birthday: time.Date(2007, time.May, 1, 23, 0, 0, 0, time.UTC), On_trend: true},
		{Name: "Haskell", Birthday: time.Date(1990, time.July, 1, 23, 0, 0, 0, time.UTC), On_trend: true},
		{Name: "Erlang", Birthday: time.Date(1986, time.January, 1, 23, 0, 0, 0, time.UTC), On_trend: true},
		{Name: "F#", Birthday: time.Date(2005, time.July, 1, 23, 0, 0, 0, time.UTC), On_trend: true},
		{Name: "Julia", Birthday: time.Date(2012, time.February, 20, 23, 0, 0, 0, time.UTC), On_trend: true},
		{Name: "Lua", Birthday: time.Date(1993, time.March, 1, 23, 0, 0, 0, time.UTC), On_trend: true},
		{Name: "Perl", Birthday: time.Date(1987, time.December, 18, 23, 0, 0, 0, time.UTC), On_trend: false},
		{Name: "Groovy", Birthday: time.Date(2003, time.May, 1, 23, 0, 0, 0, time.UTC), On_trend: false},
		{Name: "Objective-C", Birthday: time.Date(1984, time.March, 1, 23, 0, 0, 0, time.UTC), On_trend: false},
		{Name: "Visual Basic", Birthday: time.Date(1991, time.August, 1, 23, 0, 0, 0, time.UTC), On_trend: false},
		{Name: "Delphi", Birthday: time.Date(1995, time.May, 23, 23, 0, 0, 0, time.UTC), On_trend: false},
		{Name: "Pascal", Birthday: time.Date(1970, time.January, 1, 23, 0, 0, 0, time.UTC), On_trend: false},
		{Name: "COBOL", Birthday: time.Date(1959, time.August, 1, 23, 0, 0, 0, time.UTC), On_trend: false},
		{Name: "Fortran", Birthday: time.Date(1957, time.June, 1, 23, 0, 0, 0, time.UTC), On_trend: false},
	}
	jsonData, err := json.Marshal(langs); if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.Write(jsonData)
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
		r.Get("/", apiIndex)
		r.Post("/", apiCreate)
		r.Put("/", apiUpdate)
		r.Delete("/", apiDelete)
		r.Get("/lang", apiLang)
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
