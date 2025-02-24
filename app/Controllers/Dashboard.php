<?php

namespace App\Controllers;

use App\Entities\TeacherEntity;
use App\Services\TeacherService;
use App\Strategies\User\TeacherStrategy;
use App\Strategies\UserStrategy;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;

class Dashboard extends BaseController
{
    use ResponseTrait;

    protected TeacherService $teacherService;
    protected TeacherEntity|false $teacher;
    protected bool $isRestricted = true;
    protected bool $hiddenContent = true;

    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger): void
    {
        parent::initController($request, $response, $logger);

        $this->set('token', $this->session->get('token'));

        $token = $this->session->get('token');

        if ($token) {
            $this->teacherService = new TeacherService();
            $this->teacher = $this->teacherService->isLogged($token);
            if ($this->teacher) {
                UserStrategy::init(new TeacherStrategy($this->teacher));
            }
        }
    }

    public function index()
    {
        return $this->render();
    }
}
