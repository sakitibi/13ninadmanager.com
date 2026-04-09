#include "ad_engine.hpp"
#include <emscripten/bind.h>

using namespace emscripten;

EMSCRIPTEN_BINDINGS(ad_module) {
    class_<AdEngine>("AdEngine")
        .constructor<>()
        .function("setMetadata", &AdEngine::setMetadata)
        .function("shouldShowAd", &AdEngine::shouldShowAd)
        .function("pickAd", &AdEngine::pickAd)
        .function("playAdVideo", &AdEngine::playAdVideo)
        .function("updateInterval", &AdEngine::updateInterval)
        .function("skipButtonClick", &AdEngine::skipButtonClick)
        .function("getCurrentAdData", &AdEngine::getCurrentAdData);
}