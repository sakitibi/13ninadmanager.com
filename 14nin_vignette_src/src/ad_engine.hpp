#ifndef AD_ENGINE_HPP
#define AD_ENGINE_HPP

#include <emscripten/val.h>
#include <string>
#include <vector>

struct AdChoice {
    std::string src;
    int pat1;
    std::string publisher;
    std::string site;
};

class AdEngine {
private:
    std::vector<AdChoice> selects;
    emscripten::val currentAdData = emscripten::val::object();
    bool isAdPlaying = false;
    bool isTrainBuilders = false;
    bool adHookings = false;
    int hooks_counter = 0;

    // 要素復元用キャッシュ
    emscripten::val iframeNodeCache = emscripten::val::null();
    emscripten::val buttonNodeCache = emscripten::val::null();

public:
    AdEngine();
    void setMetadata(emscripten::val srcs, emscripten::val times);
    void pickAd();
    bool shouldShowAd();
    void playAdVideo();
    void skipButtonClick();
    void pickAdHooks(bool isTrainBuildersHooks);
    void updateInterval(); // 50ms / 150s のタイマー処理
    
    emscripten::val getCurrentAdData() { return currentAdData; }
};

#endif