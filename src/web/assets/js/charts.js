/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

EntriesIndex = Craft.BaseElementIndex.extend({
    getViewClass: function getViewClass(mode) {
        switch (mode) {
            case 'table':
                return EntriesTableView;
            default:
                return this.base(mode);
        }
    }
});

Craft.registerElementIndexClass('roundhouse\\formbuilder\\elements\\Entry', EntriesIndex);

EntriesTableView = Craft.TableElementIndexView.extend({
    startDate: null,
    endDate: null,

    startDatepicker: null,
    endDatepicker: null,

    $chartExplorer: null,
    $totalValue: null,
    $chartContainer: null,
    $spinner: null,
    $error: null,
    $chart: null,
    $startDate: null,
    $endDate: null,

    afterInit: function afterInit() {
        this.$explorerContainer = $('<div class="chart-explorer-container"></div>').prependTo(this.$container);
        this.createChartExplorer();

        this.base();
    },
    getStorage: function getStorage(key) {
        console.log(this.elementIndex._namespace);
        return EntriesTableView.getStorage(this.elementIndex._namespace, key);
    },
    setStorage: function setStorage(key, value) {
        EntriesTableView.setStorage(this.elementIndex._namespace, key, value);
    },
    createChartExplorer: function createChartExplorer() {
        var $chartExplorer = $('<div class="chart-explorer"></div>').appendTo(this.$explorerContainer);
        var $chartHeader = $('<div class="chart-header"></div>').appendTo($chartExplorer);
        var $dateRange = $('<div class="date-range" />').appendTo($chartHeader);
        var $startDateContainer = $('<div class="datewrapper"></div>').appendTo($dateRange);
        var $to = $('<span class="to"><i class="far fa-long-arrow-right"></i></span>').appendTo($dateRange);
        var $endDateContainer = $('<div class="datewrapper"></div>').appendTo($dateRange);
        var $total = $('<div class="total"></div>').prependTo($chartHeader);
        var $totalLabel = $('<div class="total-label"><p>' + Craft.t('form-builder', 'Total Submissions') + '</p></div>').appendTo($total);
        var $totalValueWrapper = $('<div class="total-value-wrapper"></div>').prependTo($total);
        var $totalValue = $('<span class="total-value">&nbsp;</span>').appendTo($totalValueWrapper);

        this.$chartExplorer = $chartExplorer;
        this.$totalValue = $totalValue;
        this.$chartContainer = $('<div class="chart-container"></div>').appendTo($chartExplorer);
        this.$spinner = $('<div class="loader"><svg width="20px" height="20px" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g fill="none" fill-rule="evenodd"><g transform="translate(4 3)" stroke-width="5"><circle stroke-opacity=".5" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg></div>').prependTo($chartHeader);
        this.$error = $('<div class="error"></div>').appendTo(this.$chartContainer);
        this.$chart = $('<div class="chart"></div>').appendTo(this.$chartContainer);

        this.$startDate = $('<input type="text" class="text" size="20" autocomplete="off" />').appendTo($startDateContainer);
        this.$endDate = $('<input type="text" class="text" size="20" autocomplete="off" />').appendTo($endDateContainer);

        this.$startDate.datepicker($.extend({
            onSelect: $.proxy(this, 'handleStartDateChange')
        }, Craft.datepickerOptions));

        this.$endDate.datepicker($.extend({
            onSelect: $.proxy(this, 'handleEndDateChange')
        }, Craft.datepickerOptions));

        this.startDatepicker = this.$startDate.data('datepicker');
        this.endDatepicker = this.$endDate.data('datepicker');

        this.addListener(this.$startDate, 'keyup', 'handleStartDateChange');
        this.addListener(this.$endDate, 'keyup', 'handleEndDateChange');

        var startTime = this.getStorage('startTime') || new Date().getTime() - 60 * 60 * 24 * 30 * 1000;
        var endTime = this.getStorage('endTime') || new Date().getTime();

        this.setStartDate(new Date(startTime));
        this.setEndDate(new Date(endTime));

        this.loadReport();
    },
    handleStartDateChange: function handleStartDateChange() {
        if (this.setStartDate(EntriesTableView.getDateFromDatepickerInstance(this.startDatepicker))) {
            this.loadReport();
        }
    },
    handleEndDateChange: function handleEndDateChange() {
        if (this.setEndDate(EntriesTableView.getDateFromDatepickerInstance(this.endDatepicker))) {
            this.loadReport();
        }
    },
    setStartDate: function setStartDate(date) {
        if (this.startDate && date.getTime() == this.startDate.getTime()) {
            return false;
        }

        this.startDate = date;
        this.setStorage('startTime', this.startDate.getTime());
        this.$startDate.val(Craft.formatDate(this.startDate));

        if (this.endDate && this.startDate.getTime() > this.endDate.getTime()) {
            this.setEndDate(new Date(this.startDate.getTime()));
        }

        return true;
    },
    setEndDate: function setEndDate(date) {
        if (this.endDate && date.getTime() == this.endDate.getTime()) {
            return false;
        }

        this.endDate = date;
        this.setStorage('endTime', this.endDate.getTime());
        this.$endDate.val(Craft.formatDate(this.endDate));

        if (this.startDate && this.endDate.getTime() < this.startDate.getTime()) {
            this.setStartDate(new Date(this.endDate.getTime()));
        }

        return true;
    },
    loadReport: function loadReport() {
        var requestData = this.settings.params;

        requestData.startDate = EntriesTableView.getDateValue(this.startDate);
        requestData.endDate = EntriesTableView.getDateValue(this.endDate);
        requestData.formId = this.elementIndex.$source.data('form-id');

        this.$spinner.removeClass('hidden');
        this.$error.addClass('hidden');
        this.$chart.removeClass('error');

        Craft.postActionRequest('form-builder/charts/get-entries-count', requestData, $.proxy(function (response, textStatus) {
            this.$spinner.addClass('hidden');

            if (textStatus == 'success' && typeof response.error == 'undefined') {
                if (!this.chart) {
                    this.chart = new Craft.charts.Area(this.$chart);
                }

                var chartDataTable = new Craft.charts.DataTable(response.dataTable);

                var chartSettings = {
                    orientation: response.orientation,
                    formats: response.formats,
                    dataScale: response.scale,
                    margin: { top: 10, right: 10, bottom: 30, left: 10 }
                };

                this.chart.settings.formats = response.formats;

                this.chart.draw(chartDataTable, chartSettings);
                this.$totalValue.html(response.totalHtml);
            } else {
                var msg = Craft.t('An unknown error occurred.');

                if (typeof response != 'undefined' && response && typeof response.error != 'undefined') {
                    msg = response.error;
                }

                this.$error.html(msg);
                this.$error.removeClass('hidden');
                this.$chart.addClass('error');
            }
        }, this));
    }
}, {
    storage: {},

    getStorage: function getStorage(namespace, key) {
        if (EntriesTableView.storage[namespace] && EntriesTableView.storage[namespace][key]) {
            return EntriesTableView.storage[namespace][key];
        }

        return null;
    },
    setStorage: function setStorage(namespace, key, value) {
        if (_typeof(EntriesTableView.storage[namespace]) == ( true ? 'undefined' : _typeof(undefined))) {
            EntriesTableView.storage[namespace] = {};
        }

        EntriesTableView.storage[namespace][key] = value;
    },
    getDateFromDatepickerInstance: function getDateFromDatepickerInstance(inst) {
        return new Date(inst.currentYear, inst.currentMonth, inst.currentDay);
    },
    getDateValue: function getDateValue(date) {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDc2YWE0NmNlOTdmMjI0MzI2NzIiLCJ3ZWJwYWNrOi8vLy4vZGV2ZWxvcG1lbnQvanMvY2hhcnRzLmpzIl0sIm5hbWVzIjpbIkVudHJpZXNJbmRleCIsIkNyYWZ0IiwiQmFzZUVsZW1lbnRJbmRleCIsImV4dGVuZCIsImdldFZpZXdDbGFzcyIsIm1vZGUiLCJFbnRyaWVzVGFibGVWaWV3IiwiYmFzZSIsInJlZ2lzdGVyRWxlbWVudEluZGV4Q2xhc3MiLCJUYWJsZUVsZW1lbnRJbmRleFZpZXciLCJzdGFydERhdGUiLCJlbmREYXRlIiwic3RhcnREYXRlcGlja2VyIiwiZW5kRGF0ZXBpY2tlciIsIiRjaGFydEV4cGxvcmVyIiwiJHRvdGFsVmFsdWUiLCIkY2hhcnRDb250YWluZXIiLCIkc3Bpbm5lciIsIiRlcnJvciIsIiRjaGFydCIsIiRzdGFydERhdGUiLCIkZW5kRGF0ZSIsImFmdGVySW5pdCIsIiRleHBsb3JlckNvbnRhaW5lciIsIiQiLCJwcmVwZW5kVG8iLCIkY29udGFpbmVyIiwiY3JlYXRlQ2hhcnRFeHBsb3JlciIsImdldFN0b3JhZ2UiLCJrZXkiLCJjb25zb2xlIiwibG9nIiwiZWxlbWVudEluZGV4IiwiX25hbWVzcGFjZSIsInNldFN0b3JhZ2UiLCJ2YWx1ZSIsImFwcGVuZFRvIiwiJGNoYXJ0SGVhZGVyIiwiJGRhdGVSYW5nZSIsIiRzdGFydERhdGVDb250YWluZXIiLCIkdG8iLCIkZW5kRGF0ZUNvbnRhaW5lciIsIiR0b3RhbCIsIiR0b3RhbExhYmVsIiwidCIsIiR0b3RhbFZhbHVlV3JhcHBlciIsImRhdGVwaWNrZXIiLCJvblNlbGVjdCIsInByb3h5IiwiZGF0ZXBpY2tlck9wdGlvbnMiLCJkYXRhIiwiYWRkTGlzdGVuZXIiLCJzdGFydFRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsImVuZFRpbWUiLCJzZXRTdGFydERhdGUiLCJzZXRFbmREYXRlIiwibG9hZFJlcG9ydCIsImhhbmRsZVN0YXJ0RGF0ZUNoYW5nZSIsImdldERhdGVGcm9tRGF0ZXBpY2tlckluc3RhbmNlIiwiaGFuZGxlRW5kRGF0ZUNoYW5nZSIsImRhdGUiLCJ2YWwiLCJmb3JtYXREYXRlIiwicmVxdWVzdERhdGEiLCJzZXR0aW5ncyIsInBhcmFtcyIsImdldERhdGVWYWx1ZSIsImZvcm1JZCIsIiRzb3VyY2UiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwicG9zdEFjdGlvblJlcXVlc3QiLCJyZXNwb25zZSIsInRleHRTdGF0dXMiLCJlcnJvciIsImNoYXJ0IiwiY2hhcnRzIiwiQXJlYSIsImNoYXJ0RGF0YVRhYmxlIiwiRGF0YVRhYmxlIiwiZGF0YVRhYmxlIiwiY2hhcnRTZXR0aW5ncyIsIm9yaWVudGF0aW9uIiwiZm9ybWF0cyIsImRhdGFTY2FsZSIsInNjYWxlIiwibWFyZ2luIiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0IiwiZHJhdyIsImh0bWwiLCJ0b3RhbEh0bWwiLCJtc2ciLCJzdG9yYWdlIiwibmFtZXNwYWNlIiwidW5kZWZpbmVkIiwiaW5zdCIsImN1cnJlbnRZZWFyIiwiY3VycmVudE1vbnRoIiwiY3VycmVudERheSIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJnZXREYXRlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdE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QyxTQUF6QixJQUFzQyxFQUF0QztBQUNIOztBQUVENUYseUJBQWlCMkYsT0FBakIsQ0FBeUJDLFNBQXpCLEVBQW9DckUsR0FBcEMsSUFBMkNNLEtBQTNDO0FBQ0gsS0FqQkY7QUFtQkN5QixpQ0FuQkQseUNBbUIrQndDLElBbkIvQixFQW1CcUM7QUFDaEMsZUFBTyxJQUFJL0MsSUFBSixDQUFTK0MsS0FBS0MsV0FBZCxFQUEyQkQsS0FBS0UsWUFBaEMsRUFBOENGLEtBQUtHLFVBQW5ELENBQVA7QUFDSCxLQXJCRjtBQXVCQ25DLGdCQXZCRCx3QkF1QmNOLElBdkJkLEVBdUJvQjtBQUNmLGVBQU9BLEtBQUswQyxXQUFMLEtBQW1CLEdBQW5CLElBQXdCMUMsS0FBSzJDLFFBQUwsS0FBZ0IsQ0FBeEMsSUFBMkMsR0FBM0MsR0FBK0MzQyxLQUFLNEMsT0FBTCxFQUF0RDtBQUNIO0FBekJGLENBeEtnQixDQUFuQixDIiwiZmlsZSI6Ii9yZWxlYXNlL3NyYy93ZWIvYXNzZXRzL2pzL2NoYXJ0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDA3NmFhNDZjZTk3ZjIyNDMyNjcyIiwiRW50cmllc0luZGV4ID0gQ3JhZnQuQmFzZUVsZW1lbnRJbmRleC5leHRlbmQoe1xuICAgIGdldFZpZXdDbGFzcyhtb2RlKSB7XG4gICAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICAgICAgY2FzZSAndGFibGUnOlxuICAgICAgICAgICAgICAgIHJldHVybiBFbnRyaWVzVGFibGVWaWV3XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJhc2UobW9kZSlcbiAgICAgICAgfVxuICAgIH0sXG59KVxuXG5DcmFmdC5yZWdpc3RlckVsZW1lbnRJbmRleENsYXNzKCdyb3VuZGhvdXNlXFxcXGZvcm1idWlsZGVyXFxcXGVsZW1lbnRzXFxcXEVudHJ5JywgRW50cmllc0luZGV4KVxuXG5FbnRyaWVzVGFibGVWaWV3ID0gQ3JhZnQuVGFibGVFbGVtZW50SW5kZXhWaWV3LmV4dGVuZCh7XG4gICAgc3RhcnREYXRlOiBudWxsLFxuICAgIGVuZERhdGU6IG51bGwsXG5cbiAgICBzdGFydERhdGVwaWNrZXI6IG51bGwsXG4gICAgZW5kRGF0ZXBpY2tlcjogbnVsbCxcblxuICAgICRjaGFydEV4cGxvcmVyOiBudWxsLFxuICAgICR0b3RhbFZhbHVlOiBudWxsLFxuICAgICRjaGFydENvbnRhaW5lcjogbnVsbCxcbiAgICAkc3Bpbm5lcjogbnVsbCxcbiAgICAkZXJyb3I6IG51bGwsXG4gICAgJGNoYXJ0OiBudWxsLFxuICAgICRzdGFydERhdGU6IG51bGwsXG4gICAgJGVuZERhdGU6IG51bGwsXG5cbiAgICBhZnRlckluaXQoKSB7XG4gICAgICAgIHRoaXMuJGV4cGxvcmVyQ29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cImNoYXJ0LWV4cGxvcmVyLWNvbnRhaW5lclwiPjwvZGl2PicpLnByZXBlbmRUbyh0aGlzLiRjb250YWluZXIpXG4gICAgICAgIHRoaXMuY3JlYXRlQ2hhcnRFeHBsb3JlcigpXG5cbiAgICAgICAgdGhpcy5iYXNlKClcbiAgICB9LFxuXG4gICAgZ2V0U3RvcmFnZShrZXkpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5lbGVtZW50SW5kZXguX25hbWVzcGFjZSlcbiAgICAgICAgcmV0dXJuIEVudHJpZXNUYWJsZVZpZXcuZ2V0U3RvcmFnZSh0aGlzLmVsZW1lbnRJbmRleC5fbmFtZXNwYWNlLCBrZXkpO1xuICAgIH0sXG5cbiAgICBzZXRTdG9yYWdlKGtleSwgdmFsdWUpIHtcbiAgICAgICAgRW50cmllc1RhYmxlVmlldy5zZXRTdG9yYWdlKHRoaXMuZWxlbWVudEluZGV4Ll9uYW1lc3BhY2UsIGtleSwgdmFsdWUpXG4gICAgfSxcblxuICAgIGNyZWF0ZUNoYXJ0RXhwbG9yZXIoKSB7XG4gICAgICAgIGxldCAkY2hhcnRFeHBsb3JlciA9ICQoJzxkaXYgY2xhc3M9XCJjaGFydC1leHBsb3JlclwiPjwvZGl2PicpLmFwcGVuZFRvKHRoaXMuJGV4cGxvcmVyQ29udGFpbmVyKVxuICAgICAgICBsZXQgJGNoYXJ0SGVhZGVyID0gJCgnPGRpdiBjbGFzcz1cImNoYXJ0LWhlYWRlclwiPjwvZGl2PicpLmFwcGVuZFRvKCRjaGFydEV4cGxvcmVyKVxuICAgICAgICBsZXQgJGRhdGVSYW5nZSA9ICQoJzxkaXYgY2xhc3M9XCJkYXRlLXJhbmdlXCIgLz4nKS5hcHBlbmRUbygkY2hhcnRIZWFkZXIpXG4gICAgICAgIGxldCAkc3RhcnREYXRlQ29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cImRhdGV3cmFwcGVyXCI+PC9kaXY+JykuYXBwZW5kVG8oJGRhdGVSYW5nZSlcbiAgICAgICAgbGV0ICR0byA9ICQoJzxzcGFuIGNsYXNzPVwidG9cIj48aSBjbGFzcz1cImZhciBmYS1sb25nLWFycm93LXJpZ2h0XCI+PC9pPjwvc3Bhbj4nKS5hcHBlbmRUbygkZGF0ZVJhbmdlKVxuICAgICAgICBsZXQgJGVuZERhdGVDb250YWluZXIgPSAkKCc8ZGl2IGNsYXNzPVwiZGF0ZXdyYXBwZXJcIj48L2Rpdj4nKS5hcHBlbmRUbygkZGF0ZVJhbmdlKVxuICAgICAgICBsZXQgJHRvdGFsID0gJCgnPGRpdiBjbGFzcz1cInRvdGFsXCI+PC9kaXY+JykucHJlcGVuZFRvKCRjaGFydEhlYWRlcilcbiAgICAgICAgbGV0ICR0b3RhbExhYmVsID0gJCgnPGRpdiBjbGFzcz1cInRvdGFsLWxhYmVsXCI+PHA+JytDcmFmdC50KCdmb3JtLWJ1aWxkZXInLCAnVG90YWwgU3VibWlzc2lvbnMnKSsnPC9wPjwvZGl2PicpLmFwcGVuZFRvKCR0b3RhbClcbiAgICAgICAgbGV0ICR0b3RhbFZhbHVlV3JhcHBlciA9ICQoJzxkaXYgY2xhc3M9XCJ0b3RhbC12YWx1ZS13cmFwcGVyXCI+PC9kaXY+JykucHJlcGVuZFRvKCR0b3RhbClcbiAgICAgICAgbGV0ICR0b3RhbFZhbHVlID0gJCgnPHNwYW4gY2xhc3M9XCJ0b3RhbC12YWx1ZVwiPiZuYnNwOzwvc3Bhbj4nKS5hcHBlbmRUbygkdG90YWxWYWx1ZVdyYXBwZXIpXG5cbiAgICAgICAgdGhpcy4kY2hhcnRFeHBsb3JlciA9ICRjaGFydEV4cGxvcmVyXG4gICAgICAgIHRoaXMuJHRvdGFsVmFsdWUgPSAkdG90YWxWYWx1ZVxuICAgICAgICB0aGlzLiRjaGFydENvbnRhaW5lciA9ICQoJzxkaXYgY2xhc3M9XCJjaGFydC1jb250YWluZXJcIj48L2Rpdj4nKS5hcHBlbmRUbygkY2hhcnRFeHBsb3JlcilcbiAgICAgICAgdGhpcy4kc3Bpbm5lciA9ICQoJzxkaXYgY2xhc3M9XCJsb2FkZXJcIj48c3ZnIHdpZHRoPVwiMjBweFwiIGhlaWdodD1cIjIwcHhcIiB2aWV3Qm94PVwiMCAwIDQyIDQyXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHN0cm9rZT1cIiNmZmZmZmZcIj48ZyBmaWxsPVwibm9uZVwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIj48ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoNCAzKVwiIHN0cm9rZS13aWR0aD1cIjVcIj48Y2lyY2xlIHN0cm9rZS1vcGFjaXR5PVwiLjVcIiBjeD1cIjE4XCIgY3k9XCIxOFwiIHI9XCIxOFwiLz48cGF0aCBkPVwiTTM2IDE4YzAtOS45NC04LjA2LTE4LTE4LTE4XCI+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT1cInRyYW5zZm9ybVwiIHR5cGU9XCJyb3RhdGVcIiBmcm9tPVwiMCAxOCAxOFwiIHRvPVwiMzYwIDE4IDE4XCIgZHVyPVwiMXNcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIi8+PC9wYXRoPjwvZz48L2c+PC9zdmc+PC9kaXY+JykucHJlcGVuZFRvKCRjaGFydEhlYWRlcilcbiAgICAgICAgdGhpcy4kZXJyb3IgPSAkKCc8ZGl2IGNsYXNzPVwiZXJyb3JcIj48L2Rpdj4nKS5hcHBlbmRUbyh0aGlzLiRjaGFydENvbnRhaW5lcilcbiAgICAgICAgdGhpcy4kY2hhcnQgPSAkKCc8ZGl2IGNsYXNzPVwiY2hhcnRcIj48L2Rpdj4nKS5hcHBlbmRUbyh0aGlzLiRjaGFydENvbnRhaW5lcilcblxuICAgICAgICB0aGlzLiRzdGFydERhdGUgPSAkKCc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cInRleHRcIiBzaXplPVwiMjBcIiBhdXRvY29tcGxldGU9XCJvZmZcIiAvPicpLmFwcGVuZFRvKCRzdGFydERhdGVDb250YWluZXIpXG4gICAgICAgIHRoaXMuJGVuZERhdGUgPSAkKCc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cInRleHRcIiBzaXplPVwiMjBcIiBhdXRvY29tcGxldGU9XCJvZmZcIiAvPicpLmFwcGVuZFRvKCRlbmREYXRlQ29udGFpbmVyKVxuXG4gICAgICAgIHRoaXMuJHN0YXJ0RGF0ZS5kYXRlcGlja2VyKCQuZXh0ZW5kKHtcbiAgICAgICAgICAgIG9uU2VsZWN0OiAkLnByb3h5KHRoaXMsICdoYW5kbGVTdGFydERhdGVDaGFuZ2UnKVxuICAgICAgICB9LCBDcmFmdC5kYXRlcGlja2VyT3B0aW9ucykpXG5cbiAgICAgICAgdGhpcy4kZW5kRGF0ZS5kYXRlcGlja2VyKCQuZXh0ZW5kKHtcbiAgICAgICAgICAgIG9uU2VsZWN0OiAkLnByb3h5KHRoaXMsICdoYW5kbGVFbmREYXRlQ2hhbmdlJylcbiAgICAgICAgfSwgQ3JhZnQuZGF0ZXBpY2tlck9wdGlvbnMpKVxuXG4gICAgICAgIHRoaXMuc3RhcnREYXRlcGlja2VyID0gdGhpcy4kc3RhcnREYXRlLmRhdGEoJ2RhdGVwaWNrZXInKVxuICAgICAgICB0aGlzLmVuZERhdGVwaWNrZXIgPSB0aGlzLiRlbmREYXRlLmRhdGEoJ2RhdGVwaWNrZXInKVxuXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIodGhpcy4kc3RhcnREYXRlLCAna2V5dXAnLCAnaGFuZGxlU3RhcnREYXRlQ2hhbmdlJylcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcih0aGlzLiRlbmREYXRlLCAna2V5dXAnLCAnaGFuZGxlRW5kRGF0ZUNoYW5nZScpXG5cbiAgICAgICAgbGV0IHN0YXJ0VGltZSA9IHRoaXMuZ2V0U3RvcmFnZSgnc3RhcnRUaW1lJykgfHwgKChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgLSAoNjAgKiA2MCAqIDI0ICogMzAgKiAxMDAwKSlcbiAgICAgICAgbGV0IGVuZFRpbWUgPSB0aGlzLmdldFN0b3JhZ2UoJ2VuZFRpbWUnKSB8fCAoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSlcblxuICAgICAgICB0aGlzLnNldFN0YXJ0RGF0ZShuZXcgRGF0ZShzdGFydFRpbWUpKVxuICAgICAgICB0aGlzLnNldEVuZERhdGUobmV3IERhdGUoZW5kVGltZSkpXG5cbiAgICAgICAgdGhpcy5sb2FkUmVwb3J0KClcbiAgICB9LFxuXG4gICAgaGFuZGxlU3RhcnREYXRlQ2hhbmdlKCkge1xuICAgICAgICBpZiAodGhpcy5zZXRTdGFydERhdGUoRW50cmllc1RhYmxlVmlldy5nZXREYXRlRnJvbURhdGVwaWNrZXJJbnN0YW5jZSh0aGlzLnN0YXJ0RGF0ZXBpY2tlcikpKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRSZXBvcnQoKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGhhbmRsZUVuZERhdGVDaGFuZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnNldEVuZERhdGUoRW50cmllc1RhYmxlVmlldy5nZXREYXRlRnJvbURhdGVwaWNrZXJJbnN0YW5jZSh0aGlzLmVuZERhdGVwaWNrZXIpKSkge1xuICAgICAgICAgICAgdGhpcy5sb2FkUmVwb3J0KClcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRTdGFydERhdGUoZGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGFydERhdGUgJiYgZGF0ZS5nZXRUaW1lKCkgPT0gdGhpcy5zdGFydERhdGUuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhcnREYXRlID0gZGF0ZVxuICAgICAgICB0aGlzLnNldFN0b3JhZ2UoJ3N0YXJ0VGltZScsIHRoaXMuc3RhcnREYXRlLmdldFRpbWUoKSlcbiAgICAgICAgdGhpcy4kc3RhcnREYXRlLnZhbChDcmFmdC5mb3JtYXREYXRlKHRoaXMuc3RhcnREYXRlKSlcblxuICAgICAgICBpZiAodGhpcy5lbmREYXRlICYmIHRoaXMuc3RhcnREYXRlLmdldFRpbWUoKSA+IHRoaXMuZW5kRGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RW5kRGF0ZShuZXcgRGF0ZSh0aGlzLnN0YXJ0RGF0ZS5nZXRUaW1lKCkpKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9LFxuXG4gICAgc2V0RW5kRGF0ZShkYXRlKSB7XG4gICAgICAgIGlmICh0aGlzLmVuZERhdGUgJiYgZGF0ZS5nZXRUaW1lKCkgPT0gdGhpcy5lbmREYXRlLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVuZERhdGUgPSBkYXRlXG4gICAgICAgIHRoaXMuc2V0U3RvcmFnZSgnZW5kVGltZScsIHRoaXMuZW5kRGF0ZS5nZXRUaW1lKCkpXG4gICAgICAgIHRoaXMuJGVuZERhdGUudmFsKENyYWZ0LmZvcm1hdERhdGUodGhpcy5lbmREYXRlKSlcblxuICAgICAgICBpZiAodGhpcy5zdGFydERhdGUgJiYgdGhpcy5lbmREYXRlLmdldFRpbWUoKSA8IHRoaXMuc3RhcnREYXRlLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGFydERhdGUobmV3IERhdGUodGhpcy5lbmREYXRlLmdldFRpbWUoKSkpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH0sXG5cbiAgICBsb2FkUmVwb3J0KCkge1xuICAgICAgICBsZXQgcmVxdWVzdERhdGEgPSB0aGlzLnNldHRpbmdzLnBhcmFtc1xuXG4gICAgICAgIHJlcXVlc3REYXRhLnN0YXJ0RGF0ZSA9IEVudHJpZXNUYWJsZVZpZXcuZ2V0RGF0ZVZhbHVlKHRoaXMuc3RhcnREYXRlKVxuICAgICAgICByZXF1ZXN0RGF0YS5lbmREYXRlID0gRW50cmllc1RhYmxlVmlldy5nZXREYXRlVmFsdWUodGhpcy5lbmREYXRlKVxuICAgICAgICByZXF1ZXN0RGF0YS5mb3JtSWQgPSB0aGlzLmVsZW1lbnRJbmRleC4kc291cmNlLmRhdGEoJ2Zvcm0taWQnKVxuXG4gICAgICAgIHRoaXMuJHNwaW5uZXIucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpXG4gICAgICAgIHRoaXMuJGVycm9yLmFkZENsYXNzKCdoaWRkZW4nKVxuICAgICAgICB0aGlzLiRjaGFydC5yZW1vdmVDbGFzcygnZXJyb3InKVxuXG4gICAgICAgIENyYWZ0LnBvc3RBY3Rpb25SZXF1ZXN0KCdmb3JtLWJ1aWxkZXIvY2hhcnRzL2dldC1lbnRyaWVzLWNvdW50JywgcmVxdWVzdERhdGEsICQucHJveHkoZnVuY3Rpb24ocmVzcG9uc2UsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgIHRoaXMuJHNwaW5uZXIuYWRkQ2xhc3MoJ2hpZGRlbicpXG5cbiAgICAgICAgICAgIGlmKHRleHRTdGF0dXMgPT0gJ3N1Y2Nlc3MnICYmIHR5cGVvZihyZXNwb25zZS5lcnJvcikgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZighdGhpcy5jaGFydCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXJ0ID0gbmV3IENyYWZ0LmNoYXJ0cy5BcmVhKHRoaXMuJGNoYXJ0KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBjaGFydERhdGFUYWJsZSA9IG5ldyBDcmFmdC5jaGFydHMuRGF0YVRhYmxlKHJlc3BvbnNlLmRhdGFUYWJsZSlcblxuICAgICAgICAgICAgICAgIGxldCBjaGFydFNldHRpbmdzID0ge1xuICAgICAgICAgICAgICAgICAgICBvcmllbnRhdGlvbjogcmVzcG9uc2Uub3JpZW50YXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHM6IHJlc3BvbnNlLmZvcm1hdHMsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFTY2FsZTogcmVzcG9uc2Uuc2NhbGUsXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjogeyB0b3A6IDEwLCByaWdodDogMTAsIGJvdHRvbTogMzAsIGxlZnQ6IDEwIH1cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIHRoaXMuY2hhcnQuc2V0dGluZ3MuZm9ybWF0cyA9IHJlc3BvbnNlLmZvcm1hdHNcblxuICAgICAgICAgICAgICAgIHRoaXMuY2hhcnQuZHJhdyhjaGFydERhdGFUYWJsZSwgY2hhcnRTZXR0aW5ncylcbiAgICAgICAgICAgICAgICB0aGlzLiR0b3RhbFZhbHVlLmh0bWwocmVzcG9uc2UudG90YWxIdG1sKVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBtc2cgPSBDcmFmdC50KCdBbiB1bmtub3duIGVycm9yIG9jY3VycmVkLicpXG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHJlc3BvbnNlKSAhPSAndW5kZWZpbmVkJyAmJiByZXNwb25zZSAmJiB0eXBlb2YocmVzcG9uc2UuZXJyb3IpICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIG1zZyA9IHJlc3BvbnNlLmVycm9yXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy4kZXJyb3IuaHRtbChtc2cpXG4gICAgICAgICAgICAgICAgdGhpcy4kZXJyb3IucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpXG4gICAgICAgICAgICAgICAgdGhpcy4kY2hhcnQuYWRkQ2xhc3MoJ2Vycm9yJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcykpO1xuICAgIH1cbn0sIHtcbiAgICBzdG9yYWdlOiB7fSxcblxuICAgIGdldFN0b3JhZ2UobmFtZXNwYWNlLCBrZXkpIHtcbiAgICAgICAgaWYgKEVudHJpZXNUYWJsZVZpZXcuc3RvcmFnZVtuYW1lc3BhY2VdICYmIEVudHJpZXNUYWJsZVZpZXcuc3RvcmFnZVtuYW1lc3BhY2VdW2tleV0pIHtcbiAgICAgICAgICAgIHJldHVybiBFbnRyaWVzVGFibGVWaWV3LnN0b3JhZ2VbbmFtZXNwYWNlXVtrZXldXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH0sXG5cbiAgICBzZXRTdG9yYWdlKG5hbWVzcGFjZSwga2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIEVudHJpZXNUYWJsZVZpZXcuc3RvcmFnZVtuYW1lc3BhY2VdID09IHR5cGVvZiB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIEVudHJpZXNUYWJsZVZpZXcuc3RvcmFnZVtuYW1lc3BhY2VdID0ge31cbiAgICAgICAgfVxuXG4gICAgICAgIEVudHJpZXNUYWJsZVZpZXcuc3RvcmFnZVtuYW1lc3BhY2VdW2tleV0gPSB2YWx1ZVxuICAgIH0sXG5cbiAgICBnZXREYXRlRnJvbURhdGVwaWNrZXJJbnN0YW5jZShpbnN0KSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShpbnN0LmN1cnJlbnRZZWFyLCBpbnN0LmN1cnJlbnRNb250aCwgaW5zdC5jdXJyZW50RGF5KVxuICAgIH0sXG5cbiAgICBnZXREYXRlVmFsdWUoZGF0ZSkge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpKyctJysoZGF0ZS5nZXRNb250aCgpKzEpKyctJytkYXRlLmdldERhdGUoKVxuICAgIH1cbn0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZGV2ZWxvcG1lbnQvanMvY2hhcnRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==