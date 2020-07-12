# Link Sharing Website

[View the website here](http://www.mattslinks.xyz)

This website lets me and my friends to share interesting links.

### Development

Requires:

- Docker
- Docker Compose
- Yarn
- NodeJS

To run this website locally:

```bash
# Install invoke
pip install --user invoke

# Build the Docker container
inv build

# Setup the database
./scripts/clean-db.sh

# Run the backend Django webserver
inv web
```
