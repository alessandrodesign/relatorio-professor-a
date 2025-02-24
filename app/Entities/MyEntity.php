<?php

namespace App\Entities;

use CodeIgniter\Entity\Entity;
use CodeIgniter\I18n\Time;
use Exception;

class MyEntity extends Entity
{
    /**
     * @param string $dateString
     * @return $this
     * @throws Exception
     */
    public function setCreatedAt(string $dateString): static
    {
        return $this->setTime('created_at', $dateString);
    }

    /**
     * @param string $format
     * @return string
     * @throws Exception
     */
    public function getCreatedAt(string $format = 'Y-m-d H:i:s'): string
    {
        return $this->getTime('created_at', $format);
    }

    /**
     * @param string $dateString
     * @return $this
     * @throws Exception
     */
    public function setUpdatedAt(string $dateString): static
    {
        return $this->setTime('updated_at', $dateString);
    }

    /**
     * @param string $format
     * @return string
     * @throws Exception
     */
    public function getUpdatedAt(string $format = 'Y-m-d H:i:s'): string
    {
        return $this->getTime('updated_at', $format);
    }

    /**
     * @param string $attribute
     * @param string|null $dateString
     * @return $this
     * @throws Exception
     */
    private function setTime(string $attribute, ?string $dateString = null): static
    {
        if (empty($dateString)) {
            $dateString = (new Time($dateString, app_timezone()))->format('Y-m-d H:i:s');
        }
        $this->attributes[$attribute] = new Time($dateString, app_timezone());
        return $this;
    }

    /**
     * @param string $attribute
     * @param string $format
     * @return string
     * @throws Exception
     */
    private function getTime(string $attribute, string $format = 'Y-m-d H:i:s'): string
    {
        if (empty($this->attributes[$attribute])) {
            $this->attributes[$attribute] = (new Time($this->attributes[$attribute], app_timezone()))->format('Y-m-d H:i:s');
        }
        $this->attributes[$attribute] = $this->mutateDate($this->attributes[$attribute]);
        $this->attributes[$attribute]->setTimezone($this->timezone ?? app_timezone());
        return $this->attributes[$attribute]->format($format);
    }
}