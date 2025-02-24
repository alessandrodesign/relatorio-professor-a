<?= $this->extend('components/layout') ?>

<?= $this->section('content') ?>
    <h1>Login</h1>
    <form method="post" id="loginForm">
        <input id="login" name="login" placeholder="username or email" type="text" value="alessandro-design@hotmail.com">
        <input id="password" name="password" placeholder="password" type="password" value="MUpw@*56">
        <button type="submit">Registrar</button>
    </form>
<?= $this->endSection() ?>

<?= $this->section('css') ?>
<?= $this->endSection() ?>

<?= $this->section('js') ?>
    <script type="module" src="assets/js/pages/public/login.js"></script>
<?= $this->endSection() ?>