<?= $this->extend('components/layout') ?>

<?= $this->section('content') ?>
    <h1>Olá, Mundo!</h1>
    <p>Este é um exemplo usando HTML puro com Webpack e TypeScript.</p>
<?= $this->endSection() ?>

<?= $this->section('css') ?>
<?= $this->endSection() ?>

<?= $this->section('js') ?>
    <script type="module" src="assets/js/main.js"></script>
<?= $this->endSection() ?>