package helper

import (
	"log/slog"
	"os"
)

var logger *slog.Logger

func SetupLogger() {
	logger = slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
		AddSource: true,
		Level:     slog.LevelDebug,
	}))
}

func GetLogger() *slog.Logger {
	if logger == nil {
		SetupLogger()
	}
	return logger
}
