<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\CLIRequest;
use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;

abstract class BaseController extends Controller
{
    /** @var CLIRequest|IncomingRequest $request */
    protected $request;

    /** @var list<string> $helpers */
    protected $helpers = ['alessandrodesign'];

    /** @var $session */
    protected $session;
    /** @var array $data */
    protected array $data;
    protected bool $isRestricted = false;
    protected bool $hiddenContent = false;

    protected function set(string $key, $value): void
    {
        $this->data[$key] = $value;
    }

    protected function get(string $key)
    {
        return $this->data[$key] ?? null;
    }

    /**
     * @param RequestInterface $request
     * @param ResponseInterface $response
     * @param LoggerInterface $logger
     * @return void
     */
    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger): void
    {
        parent::initController($request, $response, $logger);
        $this->data = [];
        $this->session = service('session');
    }

    protected function render(?string $view = null, ?array $data = null, ?array $options = null): string
    {
        if (is_array($data)) {
            $this->data = array_merge($this->data, $data);
        }

        $this->data['isRestricted'] = $this->isRestricted;
        $this->data['hiddenContent'] = $this->hiddenContent;

        if (!$view) {
            $backtrace = (object)debug_backtrace(DEBUG_BACKTRACE_PROVIDE_OBJECT, 2)[1];
            $class = $backtrace->class;
            $function = $backtrace->function;

            $view = ltrim(strtolower(
                str_replace(__NAMESPACE__, '', $class)
                . DIRECTORY_SEPARATOR
                . str_replace(['get', 'post', 'put', 'patch'], '', $function)
            ), DIRECTORY_SEPARATOR);
        }

        return view($view, $this->data, $options = []);
    }
}
