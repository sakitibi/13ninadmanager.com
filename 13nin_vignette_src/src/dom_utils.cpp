#include "dom_utils.hpp"

using namespace emscripten;

namespace dom {

    val createElement(const std::string& tag, const std::string& id, val parent) {
        val document = val::global("document");
        val el = document.call<val>("createElement", val(tag));
        
        if (!id.empty()) {
            el.set("id", val(id));
        }
        
        parent.call<void>("appendChild", el);
        return el;
    }

    void injectStyle(const std::string& url) {
        val document = val::global("document");
        val link = document.call<val>("createElement", val("link"));
        link.set("rel", val("stylesheet"));
        link.set("href", val(url));
        document["head"].call<void>("appendChild", link);
    }

    void setAttribute(val element, const std::string& attr, const std::string& value) {
        element.call<void>("setAttribute", val(attr), val(value));
    }

    void removeElement(const std::string& id) {
        val document = val::global("document");
        val el = document.call<val>("getElementById", val(id));
        if (!el.isNull() && !el.isUndefined()) {
            el.call<void>("remove");
        }
    }

    void setText(val element, const std::string& text) {
        element.set("textContent", val(text));
    }
}