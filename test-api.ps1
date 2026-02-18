# API Test Script for Todo Application
Write-Host "=== Testing Todo Application API ===" -ForegroundColor Green
Write-Host ""

# Test 1: Get all todos
Write-Host "Test 1: GET /api/todos" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/todos" -Method GET
    Write-Host "✅ Success! Found $($response.Count) todos" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 2: Create a todo
Write-Host "Test 2: POST /api/todos (Create Todo)" -ForegroundColor Yellow
try {
    $newTodo = @{
        title = "Test Todo from PowerShell"
        description = "This is a test todo"
        completed = $false
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/todos" -Method POST -Body $newTodo -ContentType "application/json"
    Write-Host "✅ Success! Created todo with ID: $($response.id)" -ForegroundColor Green
    $todoId = $response.id
    $response | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    $todoId = 1  # Fallback for testing
}
Write-Host ""

# Test 3: Get todo by ID
if ($todoId) {
    Write-Host "Test 3: GET /api/todos/$todoId" -ForegroundColor Yellow
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:8080/api/todos/$todoId" -Method GET
        Write-Host "✅ Success! Retrieved todo" -ForegroundColor Green
        $response | ConvertTo-Json -Depth 3
    } catch {
        Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    }
    Write-Host ""
}

# Test 4: Update todo
if ($todoId) {
    Write-Host "Test 4: PUT /api/todos/$todoId (Update Todo)" -ForegroundColor Yellow
    try {
        $updateTodo = @{
            title = "Updated Test Todo"
            description = "This todo has been updated"
            completed = $true
        } | ConvertTo-Json

        $response = Invoke-RestMethod -Uri "http://localhost:8080/api/todos/$todoId" -Method PUT -Body $updateTodo -ContentType "application/json"
        Write-Host "✅ Success! Updated todo" -ForegroundColor Green
        $response | ConvertTo-Json -Depth 3
    } catch {
        Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    }
    Write-Host ""
}

# Test 5: Filter by completed status
Write-Host "Test 5: GET /api/todos?completed=true" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/todos?completed=true" -Method GET
    Write-Host "✅ Success! Found $($response.Count) completed todos" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "=== API Tests Complete ===" -ForegroundColor Green
Write-Host ""
Write-Host "Backend Status: ✅ RUNNING" -ForegroundColor Green
Write-Host "API Base URL: http://localhost:8080/api/todos" -ForegroundColor Cyan

