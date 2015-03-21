import assert from 'assert';

export default class ASTNode {
  get node() {
    function recursive(obj, result){
      for (let key in obj) {
        let value = obj[key];
        if (value instanceof ASTNode) {
          result[key] = value.node;
        } else if (value !== null && typeof value === 'object') {
          result[key] = Array.isArray(value) ? [] : {};
          recursive(value, result[key]);
        } else {
          result[key] = value;
        }
      }
    }

    let result = {};
    recursive(this._node, result);
    return result;
  }

  get children() {
    let results = [];
    for (let child of this._children) {
      results.push(child.node);
    }
    return results;
  }

  constructor() {
    this._node = {};
    this._children = [];
  }

  addComments(comments) {
    if (!this._node.leadingComments) this._node.leadingComments = [];
    if (!comments) return;

    for (let comment of comments) {
      let formatted = this._formatJSDocComment(comment);
      this._node.leadingComments.push(formatted);
    }
  }

  _isJSDocComment(comment) {
    if (comment.type !== 'Block') return false;

    let value = comment.value;
    return !!value.match(/^\*\s+/);
  }

  _parseJSDocComment(comment) {
    assert(this._isJSDocComment(comment), `comment is not JSDoc. comment = "${comment.value}"`);

    let results = [];
    let lines = comment.value.split('\n');
    if (lines.length === 1) {
      results.push(' ' + lines[0]);
    } else {
      lines.shift();
      lines.pop();
      for (let line of lines) {
        results.push(line.replace(/^ */, ' '));
      }
    }

    return results;
  }

  _formatJSDocComment(comment) {
    if (!this._isJSDocComment(comment)) return comment;

    let lines = ['*', ...this._parseJSDocComment(comment), ' '];
    return {type: 'Block', value: lines.join('\n')};
  }

  _mergeComment(targetNode, otherNode) {
    if (!targetNode.leadingComments) targetNode.leadingComments = [];
    if (!otherNode.leadingComments) otherNode.leadingComments = [];

    if (targetNode.leadingComments.length === 0) {
      targetNode.leadingComments.push(...otherNode.leadingComments);
      return;
    }

    if (otherNode.leadingComments.length !== 1) {
      targetNode.leadingComments.push(...otherNode.leadingComments);
      return;
    }

    let targetComment = targetNode.leadingComments[targetNode.leadingComments.length - 1];
    if (!this._isJSDocComment(targetComment)) {
      targetNode.leadingComments.push(...otherNode.leadingComments);
      return;
    }

    let otherComment = otherNode.leadingComments[0];
    if (!this._isJSDocComment(otherComment)) {
      targetNode.leadingComments.push(...otherNode.leadingComments);
      return;
    }

    let targetLines = this._parseJSDocComment(targetComment);
    let otherLines = this._parseJSDocComment(otherComment);
    let lines = ['*', ...targetLines, ...otherLines, ' '];
    targetComment.type = 'Block';
    targetComment.value = lines.join('\n');
  }
}
