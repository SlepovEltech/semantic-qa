<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="/">SemanticQA</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                  <a class="nav-link" href="/search">Поиск</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/constructor">Конструктор запросов</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/manual">Инструкция</a>
              </li>

          </ul>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

