#include "ad_data.hpp"

// クラス外で初期化を行う
const std::string AdData::SITE_BASEURL = "https://13ninadmanagerclick.vercel.app/ck/";

const std::vector<Meta> AdData::AD_META_LIST = {
    {"メテヲs7のゆっくり実況部屋", "9SrU_djJLoOmVc4UX0k8CM7hElCgVGFZnM9cDDQ9byD5q5Isz-yKD1lO-FTYajEawD6o-LUCdDwGzqRzab4I7R1QHCJQA15srIODy2Qk22RQtDM1uWr5TyW3n-lfMgnjyN0zm-fnTvqdV1KH2jQJpGd4B9zQXu"},
    {"Latte", "QxmTxWxnD4zsAHrRTDLW4ObxvHec4diHfmoCDhYhkWAW5XgFacyKtUAkfigfUTE48dceqhY2yBmCCgWZOdvfl_GWjAPUEoFMShziSNGH-U2swvis6crubVcdIMs-Q72cgcSs_S3av6rCC3UIsXyMKsYe1qqEHez4trJ"},
    {"ヒナの隠れ家", "IwV62n9DIUgcOfQSYSPBSWPsnSAypR-NJG6LVjSzRImGzvrKjyVEqoM7hC7Gil-O7QJ_3bj7WnpOKQEvkcyu7Nxtl4tgT8GdrVl5cdamSzhmEufQKkpDr4YwIzDZ79I54aW42c_kQZsQZvmCCw165t4SUmMFh0bP7uePJlyCaXBB3mtHuMyroZk9"},
    {"めめんともり", "TKQVLhl2WhWwQ82S6OqY3-vXny3k3cs-ORby3iXuGvRjwtU6L8kVnCrFv2QHgoop-KxTovTdn6d_QRjqZFWAI7WsHmLLOTkVhY2tAujmyUouoBcNUOzwfj"},
    {"原神-Genshin-公式", "wfT-jXAd_ayThE7j615gVbniRpgB2cGb02osMmyOhy9DvK1_kzZZDIe60hxbk8OHK2tguZ7xac83Yl26qaVm4ZHN46GKdf6k5kS5q1aH7Q"},
    {"みぞれch", "F0qm-fkYK8ZZN8jnr077MMu4Zl9E8rhmEeimB_ax8KJcy6UqhzbhqgbG6FtPsr3G3kerRXU7KFP-39-V0QRb7CNZojGyK2Xe2pXsDc7W2m6nVjZmcYeHRL"},
    {"WECARS ウィーカーズ", "6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka"},
    {"WECARS ウィーカーズ", "6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka"},
    {"WECARS ウィーカーズ", "6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka"},
    {"WECARS ウィーカーズ", "6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka"},
    {"ゆっくりウパパロン", "Flhv9cz5_Nl143zsAcuVhkyv1NicSoU4tv9bfMQJdbVkogsEzROVkvZY0na8rZg0-klWelCsgeXC2VWJDW9MO5dIsTp4jD6ZSbw2hTpG7RD_UhOegX2zzXfxFGvDvcF3Ed0Otsg7Tf-"},
    {"茶子 / ゆっくり実況", "DFtDSz_Gd9ln2mtRBn3jGzy8gk8ofJpOEsD5zUEV87csq3epjwwziPdP6Lf6vbjzeBOLC61WPfqPMI4NMg56-MT-nLYX9RkPfBTkf3XYxeW56l3krEwjgmI"},
    {"WECARS ウィーカーズ", "6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka"},
    {"WECARS ウィーカーズ", "6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka"},
    {"WECARS ウィーカーズ", "6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka"},
    {"WECARS ウィーカーズ", "6GLxlfFs2rUuT3zTquIAsZIGprPCrAwxtErbj5acWVTB3_-Z-07lsYt9Kx4_5fJaMp5o4Fe2FkyP7dUfWnAgyiAhhY44rCl6FDAJEXfy20Wj4Ce0YfpIT8jz5f5zuTIkWEsU6AU0ka"},
    {"あかさかの箱", "CcRpgdMOX_yg1YHmtNaeR8unSC4ob_apwt64QDEP2EaWP3MNp5G4P4ZP5qF1ZGHSUpkck5GjxOf78KcZExWdowtCnIHj3XvcKYC17SKwCN9MkuKj660oQMomuvNtJB8iOF8_H400vG_ixVlEW94gN3bnH6XH0BX1zuzUB4ytgxiafpwb_x"}
};