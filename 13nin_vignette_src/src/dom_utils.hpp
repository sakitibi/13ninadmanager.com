#ifndef DOM_UTILS_HPP
#define DOM_UTILS_HPP

#include <emscripten/val.h>
#include <string>

namespace dom {
    // 要素を作成し、親要素に追加する
    emscripten::val createElement(const std::string& tag, const std::string& id = "", emscripten::val parent = emscripten::val::global("document")["body"]);
    
    // スタイルシート（linkタグ）をheadに追加する
    void injectStyle(const std::string& url);
    
    // 要素に属性をセットする
    void setAttribute(emscripten::val element, const std::string& attr, const std::string& value);
    
    // 要素を削除する
    void removeElement(const std::string& id);

    // テキストコンテンツをセットする
    void setText(emscripten::val element, const std::string& text);
}

#endif