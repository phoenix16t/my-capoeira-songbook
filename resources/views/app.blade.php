<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>@yield('title', 'My Capoeira Songbook')</title>
  @routes
  @vite('resources/js/app.js')
  @inertiaHead
</head>
<body>
  @inertia
</body>
</html>
