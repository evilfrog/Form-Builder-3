var FormBuilderSection = void 0;

window.FormBuilderSection = Garnish.Base.extend({
    $container: null,
    $titlebar: null,
    $fieldsContainer: null,
    $optionsContainer: null,
    $previewContainer: null,
    // $actionMenu: null,
    $collapserBtn: null,
    $sectionToggleInput: null,
    $menuBtn: null,
    $status: null,
    modal: null,
    collapsed: false,
    optionCollapsed: true,
    type: null,
    $delete: null,

    init: function init(el, type) {
        var menuBtn = void 0;
        this.type = type;
        this.$container = $(el);
        this.$menuBtn = this.$container.find('.actions > .settings');
        this.$collapserBtn = this.$container.find('.actions > .bodytoggle');
        this.$sectionToggleInput = this.$container.find('.section-toggle');
        this.$titlebar = this.$container.find('.titlebar');
        this.$fieldsContainer = this.$container.find('.body');
        this.$optionsContainer = this.$container.find('.body-options');
        this.$previewContainer = this.$container.find('.preview');
        this.$status = this.$container.find('.actions > .status');
        this.$delete = this.$container.find('.delete-btn');

        // menuBtn = new Garnish.MenuBtn(this.$menuBtn);
        // this.$actionMenu = menuBtn.menu.$container;
        // menuBtn.menu.settings.onOptionSelect = $.proxy(this, 'onMenuOptionSelect');

        if (Garnish.hasAttr(this.$container, 'data-collapsed')) {
            this.collapse();
        }

        this._handleTitleBarClick = function (ev) {
            ev.preventDefault();
            return this.toggle();
        };

        this.addListener(this.$delete, 'click', this.delete);
        this.addListener(this.$collapserBtn, 'click', this.toggle);
        this.addListener(this.$titlebar, 'doubletap', this._handleTitleBarClick);
    },
    toggle: function toggle() {
        if (this.collapsed) {
            return this.expand();
        } else {
            this.$sectionToggleInput.prop('checked', true);
            return this.collapse(true);
        }
    },
    collapse: function collapse(animate) {
        var $customTemplates = void 0;
        var $fields = void 0;
        var previewHtml = void 0;
        var title = void 0;

        this.$sectionToggleInput.prop('checked', true);
        if (this.collapsed) {
            return;
        }

        this.$container.addClass('bodycollapsed');
        previewHtml = '';
        title = this.$titlebar.find('.tout-title').text();

        this.$previewContainer.html(previewHtml);
        this.$fieldsContainer.velocity('stop');
        this.$container.velocity('stop');

        if (animate) {
            this.$fieldsContainer.velocity('fadeOut', {
                duration: 'fast'
            });

            this.$container.velocity({
                height: '100%'
            }, 'fast');
        } else {
            this.$previewContainer.show();
            this.$fieldsContainer.hide();
            this.$container.css({
                height: '100%'
            });
        }

        // setTimeout($.proxy((function() {
        //     this.$actionMenu.find('a[data-action=collapse]:first').parent().addClass('hidden');
        //     return this.$actionMenu.find('a[data-action=expand]:first').parent().removeClass('hidden');
        // }), this), 200);

        return this.collapsed = true;
    },
    expand: function expand() {
        var collapsedContainerHeight = void 0;
        var expandedContainerHeight = void 0;
        this.$sectionToggleInput.prop('checked', false);
        if (!this.collapsed) {
            return;
        }
        this.$container.removeClass('bodycollapsed');
        this.$fieldsContainer.velocity('stop');
        this.$container.velocity('stop');
        collapsedContainerHeight = this.$container.height();
        this.$container.height('auto');
        this.$fieldsContainer.show();
        expandedContainerHeight = this.$container.height();
        this.$container.height(collapsedContainerHeight);

        this.$fieldsContainer.hide().velocity('fadeIn', {
            duration: 'fast'
        });

        this.$container.velocity({
            height: expandedContainerHeight
        }, 'fast', $.proxy(function () {
            return this.$container.height('auto');
        }, this));

        // setTimeout($.proxy((function() {
        //     this.$actionMenu.find('a[data-action=collapse]:first').parent().removeClass('hidden');
        //     return this.$actionMenu.find('a[data-action=expand]:first').parent().addClass('hidden');
        // }), this), 200);

        return this.collapsed = false;
    },
    disable: function disable() {
        this.$fieldsContainer.find('.enable-integration-section').prop('checked', false);
        this.$status.removeClass('on');
        this.$status.addClass('off');
        // setTimeout($.proxy((function() {
        //     this.$actionMenu.find('a[data-action=disable]:first').parent().addClass('hidden');
        //     return this.$actionMenu.find('a[data-action=enable]:first').parent().removeClass('hidden');
        // }), this), 200);

        return this.collapse(true);
    },
    enable: function enable() {
        this.$fieldsContainer.find('.enable-integration-section').prop('checked', true);
        this.$status.removeClass('off');
        this.$status.addClass('on');
        // return setTimeout($.proxy((function() {
        //     this.$actionMenu.find('a[data-action=disable]:first').parent().removeClass('hidden');
        //     return this.$actionMenu.find('a[data-action=enable]:first').parent().addClass('hidden');
        // }), this), 200);
    },
    "delete": function _delete() {
        return this.$container.remove();
    },
    settings: function settings() {
        if (!this.modal) {
            return this.modal = new SettingsModal(this);
        } else {
            return this.modal.show();
        }
    },
    updateSectionSettings: function updateSectionSettings() {
        return $.each(this.modal.$modalInputs, $.proxy(function (i, input) {
            var value = void 0;
            value = $(input).val();
            if (value !== '') {
                return this.$container.prepend($(input).addClass('hidden'));
            }
        }, this));
    },
    onMenuOptionSelect: function onMenuOptionSelect(option) {
        var $option = void 0;
        $option = $(option);

        switch ($option.data('action')) {
            case 'collapse':
                return this.collapse(true);
            case 'expand':
                return this.expand();
            case 'disable':
                return this.disable();
            case 'enable':
                this.enable();
                return this.expand();
            case 'delete':
                return this["delete"]();
            case 'settings':
                return this.settings();
        }
    }
});

Garnish.$doc.ready(function () {
    $('.section-collapsible').each(function (i, el) {
        new window.FormBuilderSection(el, $(el).data('type'));
    });

    if (Craft.elementIndex) {
        Craft.elementIndex.on('selectSource', function (e) {
            var groupId = void 0;
            groupId = e.target.$source.data('id');

            if (groupId) {
                $('#new-form-btn').attr("href", Craft.getCpUrl() + ("/form-builder/forms/new?groupId=" + groupId));
            } else {
                $('#new-form-btn').attr('href', Craft.getCpUrl() + '/form-builder/forms/new?groupId=1');
            }
        });
    }

    if ($('.fb-forms').length > 0) {
        new Clipboard('.copy-handle', {
            target: function target(trigger) {
                var handle;
                handle = $(trigger).data('handle');
                Craft.cp.displayNotice(Craft.t("form-builder", "Form handle `" + handle + "` copied"));
            }
        });

        new Clipboard('.twig-snippet', {
            text: function text(trigger) {
                var handle, snippet;
                handle = $(trigger).data('handle');
                snippet = '{{ craft.fb.form("' + handle + '") }}';
                Craft.cp.displayNotice(snippet + Craft.t('form-builder', ' copied'));
                return snippet;
            }
        });
    }

    $('.delete-form').on('click', function (e) {
        var data = void 0;
        e.preventDefault();
        data = {
            id: $(this).data('id')
        };

        if (confirm(Craft.t('form-builder', "Are you sure you want to delete this form and all its entries?"))) {
            Craft.postActionRequest('form-builder/forms/delete', data, $.proxy(function (response, textStatus) {
                if (textStatus === 'success') {
                    Craft.cp.displayNotice(Craft.t('form-builder', 'Form deleted'));
                    window.location.href = Craft.getCpUrl() + '/form-builder/forms';
                }
            }, this));
        }
    });
});