GitBook Widget Plugin
==============

This is a plugin for GitBook since version 2.3.0.

It integrates a inline frame widget into you book.

[![NPM](https://nodei.co/npm/gitbook-plugin-widget.png?downloads=true)](https://nodei.co/npm/gitbook-plugin-widget/)

## Usage

Add the plugin to the book setting `book.json` and set the required options.

## Options

- `common` - This specifies the widget to display on all pages of your book's. (Required, Array)
- `specific` - This specifies the widget to display on a specific page of your book's. (Required, Array)
- `container` - The Container is the display part of the widget. (Required)
  - `parent` - Specifies the parent element of the position where the container is displayed. (Required)
  - `elem` - Specify the element of the container. (Required)
  - `attr` - Specify attributes of container elements. (Required)
    - `id` - Specify the ID of the container element. (Required)
  - `child` - Specify the child element of the container.
    - `elem` - You can specify elements of child elements just like containers.
    - `attr` - You can specify attributes of child elements just like containers.
    - `text` - You can specify the text of the child element.
- `style` - You can specify the style of the container.
  - `text` - The actual style can be specified in the text of the element.
- `iframe` - Specifies an external web page to display in the container. (Required)
  - `elem` - Specify the element of the iframe. (Required)
  - `attr` - Specify attributes of iframe elements. (Required)
    - `id` - Specify the ID of the iframe element. (Required)
    - `name` - Specify the name of the iframe element. (Required)
- `form` - Specify the form for sending data to external web page. (Required)
  - `elem` - Specify the element of the form. (Required)
  - `attr` - Specify attributes of form elements. (Required)
    - `id` - Specify the ID of the form element. (Required)
    - `action` - Specify the action of the form element. (Required)
    - `method` - Specify the method of the form element. (Required)
    - `target` - Specify the target of the form element. (Required)
  - `child` - Specify the data on the external web page as a child element of the form element.
    - `elem` - You can specify elements of child elements.
    - `attr` - You can specify attributes of child elements.
    - `text` - You can specify the text of the child element.

## Example

```JSON
{
  "plugins": [
    "widget"
  ],
  "pluginsConfig": {
    "widget": {
      "common": [{
        "container": {
          "parent": "body",
          "elem": "div",
          "attr": {
            "id": "contactWidget"
          },
          "child": [{
            "elem": "p",
            "text": "test"
          }]
        },
        "style": {
          "elem": "style",
          "text": "#widgetFrame { width:100%; height:500px; } #contactWidget { width:300px; height:200px; transition-duration: 1s; bottom: -140px; right: 0; position: fixed; } #contactWidget:hover { transform:translateY(-190px); }"
        },
        "iframe": {
          "elem": "iframe",
          "attr": {
            "id": "widgetFrame",
            "name": "widgetFrame",
            "frameBorder": "0",
            "scrolling": "no"
          }
        },
        "form": {
          "elem": "form",
          "attr": {
            "id": "widgetForm",
            "action": "https://example.com/form",
            "method": "POST",
            "target": "widgetFrame"
          },
          "child": [{
            "elem": "input",
            "attr": {
              "id": "access_token",
              "type": "hidden",
              "name": "access_token",
              "value": {
                "type": "localStorage",
                "path": "access_token"
              }
            }
          }, {
            "elem": "input",
            "attr": {
              "id": "state",
              "type": "hidden",
              "name": "state",
              "value": {
                "type": "state",
                "path": "state.page"
              }
            }
          }]
        }
      }]
    }
  }
}
```

Аfter configuring book.json, run gitbook install to install all added plugins.
