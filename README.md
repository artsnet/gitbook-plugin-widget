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
    - `action` - Specify the action of the form element. (Required)
    - `method` - Specify the method of the form element. (Required)
    - `target` - Specify the target of the form element. (Required)
  - `child` - Specify the data on the external web page as a child element of the form element.
    - `elem` - You can specify elements of child elements.
    - `attr` - You can specify attributes of child elements.
      - `value` - If the data to be sent in the form is text, it will be the value as it is. If the data you send in the form is an object, you can specify the following types:
        - `type` - You can specify `localStorage` and `state` and `location`. `localStorage` is used to send tokens like JWT. `state` is used to send specific context of gitbook. `location` is `window.location`;
        - `path` - Specify the path of `localStorage` or` state` value. For `localStorage`, specify Key name. For `state`, specify a specific path of the gitbook state object. For `location`, specify a specific path of the `window.location` object. If path is not specified, all objects are returned.

        e.g. Specify the location
        ```json
        {
          "elem": "input",
          "attr": {
            "id": "location",
            "type": "hidden",
            "name": "location",
            "value": {
              "type": "location",
              "path": "pathname"
            }
          }
        }
        ```

        e.g. location object
        ```json
        "location": {
          "href": "https://example.com/current.html",
          "ancestorOrigins": {},
          "origin": "https://example.com",
          "protocol": "https:",
          "host": "example.com",
          "hostname": "example.com",
          "port": "",
          "pathname": "/current.html",
          "search": "",
          "hash": ""
      	}
        ```

        e.g. Specify the gitbook state
        ```json
        {
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
        }
        ```

        e.g. gitbook state object
        ```JSON
        "gitbook": {
          "state": {
            "page": {
              "title": "title",
              "level": "2.1.2",
              "depth": 2,
              "next": {
                "title": "title",
                "level": "2.1.3",
                "depth": 2,
                "path": "example.com/current.md",
                "ref": "example.com/current.md",
                "articles": []
              },
              "previous": {
                "title": "prepage title",
                "level": "2.1.1",
                "depth": 2,
                "path": "example.com/pre.md",
                "ref": "example.com/pre.md",
                "articles": []
              },
              "dir": "ltr"
            },
            "file": {
              "path": "example.com/current.md",
              "mtime": "2018-08-23T03:03:16.000Z",
              "type": "markdown"
            },
            "gitbook": {
              // Gitbook version etc.
            },
            "config": {
              // The contents set in book.js etc.
            },
            "basePath": "..",
            "book": {
              // Gitbook language etc.
            }
          }
        }
        ```
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
          }
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
