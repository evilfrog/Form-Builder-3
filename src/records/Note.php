<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\records;

use craft\db\ActiveRecord;
use yii\db\ActiveQueryInterface;

class Note extends ActiveRecord
{
    // Public Static Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%formbuilder_entries_notes}}';
    }

    /**
     * Return entry
     *
     * @return ActiveQueryInterface
     */
    public function getEntry(): ActiveQueryInterface
    {
        return $this->hasOne(Form::class, ['id' => 'entryId']);
    }

}
