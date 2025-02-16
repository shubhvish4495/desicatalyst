BINARY_NAME=relay-service
BUILD_DIR=bin
GO=$(shell which go || echo 'go')
DOCKER=$(shell which podman || which docker || echo 'docker')

# Start PostgreSQL container with initialization script
db-up:
	$(DOCKER) run --name desicatalyst-info-db -d \
	  -e POSTGRES_USER=$(DB_USER) \
	  -e POSTGRES_PASSWORD=$(DB_PASS) \
	  -e POSTGRES_DB=$(DB_NAME) \
	  -p 5432:5432 \
	  -v postgres_data:/var/lib/postgresql/data \
	  -v $(PWD)/db/initdb.sql:/docker-entrypoint-initdb.d/initdb.sql \
	  postgres:latest


# Stop and remove the database container
db-down:
	$(DOCKER) stop desicatalyst-info-db || true
	$(DOCKER) rm desicatalyst-info-db || true
	#docker volume rm postgres_data || true

# Build the Go application
build: clean $(SRC)
	@echo "+ $@"
	@mkdir -p $(BUILD_DIR)
	@echo "    🔨 Building the binary..."
	@go build -o $(BUILD_DIR)/$(BINARY_NAME) .

# Run the application
run: build
	@echo "🚀 Running the application..."
	@$(BUILD_DIR)/$(BINARY_NAME)

clean:
	@echo "+ $@"
	@echo "    🗑️  Cleaning up..."
	@rm -rf $(BUILD_DIR)