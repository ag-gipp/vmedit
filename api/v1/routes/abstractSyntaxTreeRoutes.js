'use strict';

const express = require('express');
const astRouter = module.exports = express.Router({ mergeParams: true });
const multer = require('multer');
const upload = multer();
const RequestValidator = require('app/lib/RequestValidator');
const astController = require('../controller/AbstractSyntaxTreeController');

/**
   * @api {post} /api/v1/math/renderAST POST /api/v1/math/renderAST
   * @apiParam (Headers) {String} Accept type of result [application/json | image/svg+xml]
   * @apiParam (Body (multipart/form-data)) {String} mathml the mathML to be rendered into an AST
   * @apiParam (Body (multipart/form-data)) {Boolean} [renderFormula] flag wether entire formula should be rendered to the top of the AST. <br>Defaults to false
   * @apiParam (Body (multipart/form-data)) {Boolean} [collapseSingleOperandNodes] flag wether nodes with only one child should be collapsed <br>Defaults to true
   * @apiName RenderAst
   * @apiGroup Math
   * @apiDescription Renders an abstract syntax tree based on provided mathML
   * @apiSuccess (Success 200) svg abstract syntax tree
   */
astRouter.post('/renderAST',
                upload.none(),
                RequestValidator.multiPartFormData,
                RequestValidator.parseParams(
                  [{
                    name: 'mathml',
                    origin: 'BODY',
                    type: 'xml',
                    optional: false
                  },
                  {
                    name: 'collapseSingleOperandNodes',
                    origin: 'BODY',
                    type: 'boolean',
                    optional: true
                  },
                  {
                    name: 'renderFormula',
                    origin: 'BODY',
                    type: 'boolean',
                    optional: true
                  }]),
                astController.renderAst);

/**
   * @api {post} /api/v1/math/renderMergedAST POST /api/v1/math/renderMergedAST
   * @apiParam (Headers) {String} Accept type of result [application/json | application/js]
   * @apiParam (Body (multipart/form-data)) {String} reference_mathml the mathML of reference document
   * @apiParam (Body (multipart/form-data)) {String} comparison_mathml the mathML of comparison document
   * @apiParam (Body (multipart/form-data)) {JSON} similaries the JSON containing match information
   * @apiName RenderMergedAst
   * @apiGroup Math
   * @apiDescription Renders a merged AST
   * @apiSuccess (Success 200) svg merged abstract syntax tree
   */
astRouter.post('/renderMergedAST',
                upload.none(),
                RequestValidator.multiPartFormData,
                RequestValidator.parseParams(
                  [{
                    name: 'reference_mathml',
                    origin: 'BODY',
                    type: 'xml',
                    optional: false
                  },
                  {
                    name: 'comparison_mathml',
                    origin: 'BODY',
                    type: 'xml',
                    optional: false
                  },
                  {
                    name: 'similarities',
                    origin: 'BODY',
                    type: 'json',
                    optional: false
                  }]),
                astController.renderMergedAst);

/**
   * @api {post} /api/v1/math/renderPMML POST /api/v1/math/renderPMML
   * @apiParam (Body (multipart/form-data)) {String} mathml the presentation-MathML to be rendered
   * @apiName RenderFormula
   * @apiGroup Math
   * @apiDescription Renders presentation-MathML into SVG (Do not enclose <math></math>)
   * @apiSuccess (Success 200) {svg} svg rendered formula
   */
astRouter.post('/renderPMML', upload.none(), astController.renderMML);
