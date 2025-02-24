<?= $this->extend('components/layout') ?>

<?= $this->section('content') ?>
    <form method="post" id="registerForm">
        <input id="name" name="name" placeholder="name" type="text">
        <input id="email" name="email" placeholder="email" type="email">
        <input id="username" name="username" placeholder="username" type="text">
        <input id="password" name="password" placeholder="password" type="password">
        <button type="submit">Registrar</button>
    </form>
<?= $this->endSection() ?>

<?= $this->section('css') ?>
<?= $this->endSection() ?>

<?= $this->section('js') ?>
    <script type="module" src="assets/js/pages/admin/register.js"></script>
<?= $this->endSection() ?>