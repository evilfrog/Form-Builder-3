<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\web\twig;

use Craft;

class Extensions extends \Twig_Extension
{
    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function getName()
    {
        return 'FormBuilder';
    }

    /**
     * @inheritdoc
     */
    public function getFilters()
    {
        return [
            new \Twig_SimpleFilter('json_decode', [$this, 'json_decode']),
            new \Twig_SimpleFilter('getClass', [$this, 'getClass']),
            new \Twig_SimpleFilter('timeAgo', [$this, 'getTimeAgo']),
            new \Twig_SimpleFilter('browser', [$this, 'browser']),
            new \Twig_SimpleFilter('formatBytes', [$this, 'formatBytes']),
            new \Twig_SimpleFilter('isMulti', [$this, 'isMulti']),
        ];
    }


    /**
     * Return decoded json object
     *
     * @param $json
     * @return mixed
     */
    public function json_decode($json)
    {
        return json_decode($json);
    }

    /**
     * Get clean element class name
     *
     * @param $object
     * @return string
     */
    public function getClass($object)
    {
        return (new \ReflectionClass($object))->getShortName();
    }

    /**
     * Get user friend time ago value
     *
     * @param $time
     * @return string
     */
    public function getTimeAgo($time)
    {
        $periods = array("second", "minute", "hour", "day", "week", "month", "year", "decade");
        $lengths = array("60","60","24","7","4.35","12","10");

        $now = time();
        $difference     = $now - strtotime($time);

        for($j = 0; $difference >= $lengths[$j] && $j < count($lengths)-1; $j++) {
            $difference /= $lengths[$j];
        }

        $difference = round($difference);

        if($difference != 1) {
            $periods[$j].= "s";
        }

        return "$difference $periods[$j]";
    }

    /**
     * Get browser from user-agent string
     *
     * @param $browser
     */
    public function browser($browser)
    {
        if(strpos($browser, 'MSIE') !== FALSE)
            echo 'Internet explorer';
        elseif(strpos($browser, 'Trident') !== FALSE) //For Supporting IE 11
            echo 'Internet explorer';
        elseif(strpos($browser, 'Firefox') !== FALSE)
            echo 'Mozilla Firefox';
        elseif(strpos($browser, 'Chrome') !== FALSE)
            echo 'Google Chrome';
        elseif(strpos($browser, 'Opera Mini') !== FALSE)
            echo "Opera Mini";
        elseif(strpos($browser, 'Opera') !== FALSE)
            echo "Opera";
        elseif(strpos($browser, 'Safari') !== FALSE)
            echo "Safari";
        else
            echo 'Unknown';
    }

    /**
     * Format bytes to ...
     *
     * @param $bytes
     * @param int $precision
     * @return string
     */
    public function formatBytes($bytes, $precision = 0)
    {
        $units = array('B', 'KB', 'MB', 'GB', 'TB');
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);

        // Uncomment one of the following alternatives
        $bytes /= pow(1024, $pow);

        return round($bytes, $precision) . ' ' . $units[$pow];
    }

    /**
     * Check if multi dimensional array
     *
     * @param $array
     * @return bool
     */
    public function isMulti(array $array)
    {
        $rv = array_filter($array,'is_array');
        if(count($rv)>0) return true;
        return false;
    }
}
