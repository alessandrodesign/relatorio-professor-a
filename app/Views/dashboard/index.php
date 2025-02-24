<?= $this->extend('components/layout') ?>

<?= $this->section('content') ?>
    <h1>Dashboard</h1>
    <p>Este é um exemplo usando HTML puro com Webpack e TypeScript.</p>
    <p><?= user()->name ?></p>
<?= $this->endSection() ?>

<?= $this->section('css') ?>
<?= $this->endSection() ?>

<?= $this->section('js') ?>
    <script type="module" src="assets/js/pages/dashboard/auth.js"></script>
<?= $this->endSection() ?>