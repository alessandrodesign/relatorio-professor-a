<!DOCTYPE html>
<html lang="<?= request()->getLocale() ?>">
<head>
    <base href="<?= site_url() ?>">
    <meta charset="UTF-8">
    <?php if (isset($token)): ?>
        <meta name="auth-token" content="<?= $token ?>">
    <?php endif; ?>
    <title>Meu Projeto com Webpack</title>
    <link rel="stylesheet" href="libs/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="libs/bootstrap-icons/bootstrap-icons.css">
    <?= $this->renderSection('css') ?>
</head>
<body>
<?php if ($hiddenContent): ?>

    <?= $this->renderSection('content') ?>

<?php endif; ?>

<?= $this->renderSection('js') ?>
</body>
</html>
