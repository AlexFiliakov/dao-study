# Remove Next.js build cache
if (Test-Path .next) {
    Remove-Item -Recurse -Force .next
}

# # Remove node_modules
# if (Test-Path node_modules) {
#     Remove-Item -Recurse -Force node_modules
# }

# # Remove package-lock.json
# if (Test-Path package-lock.json) {
#     Remove-Item -Force package-lock.json
# }

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install

# Rebuild the project
npm run build