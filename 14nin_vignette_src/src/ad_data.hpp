#ifndef AD_DATA_HPP
#define AD_DATA_HPP

#include <vector>
#include <string>

struct Meta {
    std::string pub;
    std::string key;
};

class AdData {
public:
    // ヘッダーでは宣言のみ
    static const std::string SITE_BASEURL;
    static const std::vector<Meta> AD_META_LIST;
};

#endif