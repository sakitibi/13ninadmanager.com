const RTBHouse = "https://sin.creativecdn.com/imp-delivery?tk=";
const Criteo = "https://ads.as.criteo.com/delivery/r/afr.php?";
const SakitibiAdmanager = "https://sakitibi.github.io/13ninadmanager.com/";
const urls = [
    `${SakitibiAdmanager}SuperNewRoles-Logo`,
    `${SakitibiAdmanager}13ninad-1`,
    `${SakitibiAdmanager}13ninad-2`,
    `${SakitibiAdmanager}SKNewRoles-Logo`,
    // 100
    `${SakitibiAdmanager}13ninad-3`,
    `${RTBHouse}K6GQBQDLXP4WjcSmic7-AXMKXeXVl_WzffA4KQPm1NaZHp0MtytSHsUhv_AN4bq_KJQ2VI8w18alSBDWXH9wxuZfrvTHa0FFNOTT_tnHQfL0mcee_qv7vwh8KpmP8goHDbMjBxuL7h5xvQtuOBeHaBdqJCrlgi2LWzaT55kcmEauakV6y50pNES_IZwbqIkwNaUWh1QgdWBsafGjk9bWm5VO0Kzl7RH_3jrqKWU2VJ3Y3NkKiBlmdwCnCA28HXo_JpyRa_fWMon4bli6svAZiocsnSPdck61DNu7Uz_tOiyNTHYuCYluRlLQBbNLFhSVt9OM3Hgn1re15kbpN0RFSfClwRC9Tj0D7nc0TzjpFWI5xgShvE6_be_-JHTGeWQBbGOrBee7EgJ0OQY8K7APJeS5uJXXwlSsJSWaEW6ZIKpJLuMzikLqz_p_YJWNTi1VYjxmna0GiJvq6S5Sg6WOr5YKAMQTUfgjtiOMLbySm06CFqjkdRGAq5j_eKD21tFAV8yDenL25FwJWv948Oz7sFEwuxRRcRJ5e5AY1C9uHAU&curl=https%3A%2F%2Fsin.creativecdn.com%2Fclicks%3F%7BEXTRA_CLICK_PARAMS%7D&tdc=sin`,
    `${RTBHouse}i0huzcOt0wa2o2H0XKNncsoEyUCuhvjwdp60dnDOBbpQ7Fa--ZZQW4B_wwz5YiXARRJA-4rkpChZ6pq8Y8XQ3dmjAlG062bIZIahVC_hhl9WpcB2KXvUHBKa5kelYfGxTRmhn9JQv7zg8GCpszpUJiLPwsQC_oRHZ_a119FJ0euEHIQbIhfi4kqhuOH5I4GzSBNQilPmOUv8OmPn9NtmC9rrKIveUQTBBFhtTevh6veUHUpz_cecmgW7BJgUjul1xUIpfFUdjty7TFb1LQtgsOWLK5QRCY-NZX0RcGsRH8JDDEzWD86FyFa7PaFKXqVydB9ONk9FH8BhND8vkppS9oDjCqZTvHXVj77iRzK77nIEQt2B1MO0k_NSEEMVAAFuR_Nmf78_1Rj4iUdOPAWavaZACrFL6pV2IkFaml3ll70Q-39rsE5L-0miwSefDXX6IEB0pYEOPCRJv8eS-XfdGYBjMfIdUJ1DpQ3azMRlQQ3hr2yQOjymyJCAuXfumuX-MGcKQaJ8vOAwymfYmIy5hUoC7le_2iBt18SeIxIkbzc&curl=https%3A%2F%2Fsin.creativecdn.com%2Fclicks%3F%7BEXTRA_CLICK_PARAMS%7D&tdc=sin`,
    `${RTBHouse}kRsSmftXCtKWxHYdG2_mRT0wZUw4GEkIEJ0fWA2zHQBN-4eiP8xC85aALnpvJGf6ppBrsT9ID9HNum49HwoE0QKXeZEJ3roQd2EouF7undtXqh3UX_MRoZkHK_PRj4J8AuVfJgq4vUI30wmkGGra_IhdH27AiCXdqeBhZdm6ldJWptUWeCSNHQfLP17aST0VOLTBLBVYz-7YaMyvl9saKQ91lfL0iFFG2RTRgZnsHQahIkROpUQtRUoH_HuykLHlnsBbuzq5DEUplJj9rw_sbT3O-VrrSt3KgDj5Gg2VFyVCRUwOx6_dLHu6JNobebNVWmWBRsVd2ZLQspmv6804Etk-N1ukhzGxzjnCbRasPVv76W079LAfjeWBVBPxw2jh4Pmm3E_EV5X4BybatWw7AffS4UngwKjVrO9ftuGUjGER534eNVsJe1xBQUakf92SCUXVOo5dARnJw_MOv1dE-EIsic83ipVWlveSKiB_Pv5urqxtmLFwU_x5jNIh8BNpw-7ZC4S5INIHm6ggPYrL7uJGpdrRiaBXb2zVkbGCX_fSEsGxysHthw1ukdaP_rpq&curl=https%3A%2F%2Fsin.creativecdn.com%2Fclicks%3F%7BEXTRA_CLICK_PARAMS%7D&tdc=sin`,
    `${RTBHouse}4W47I5lMNTWpojAH3PEjY2I50XJMAiUAK8kb6yBBFLPhcuMpr1s6LUB-8JF-W7OqEzaSNxuV0Tvf-tfiCJRkLssswMGlzJyxw12BNKgrOy5YXx9KzRRmph2bRL_L9DhQA7yAWRq1i_jXOpAh5hGw_aPi-wXQJAg6ThKdDZmZz4Bu2_Yup1nZXeChoGPPkEAryUxQu8pKLj-WMyy0lhR3aMRMSJApXzwKT87665lJusBoc-bN2OVnvMHbwZs2_tBkLkDnFBPB6SKp1u7ttjOBM_DLwqhh7ihWvvc-6C_9F1iAId6tr6dcLhaaO8qlbGvxfm2l0ubk6RzgieHoao6PpIkL1meuWkTAsf-XGbsCjUS4mj7bu80-PxHhsCsTrVGdeV4oGh71jxStzFpVy29YxtauILi5v90aWn2eBZaX596NqJ9fRbjar-rKufTtPLixifIBMW9mZ7b5By_GTQL5U2DMWQO-2JRtDZ3hlpbpd6sQsyG7urFGU98gGjLfp5zvLMlrhoEBYoFT3giEriOZz7UQnwcYo5orjXwGzwHJcP-LoJnBCckcY9F-lU3dObTR&curl=https%3A%2F%2Fsin.creativecdn.com%2Fclicks%3F%7BEXTRA_CLICK_PARAMS%7D&tdc=sin`,
    `${RTBHouse}hztKIVHj42QQdIO2OCRWxN5bWtWUImq6rJkMAElt4eiHaGjyjkvgBCYt1SMGKhIp9RgjtzfgXF-OaUYOC0a94FPAAni0kU3dckI5m9m486iqgzNjzqJ5mp_XFQcZRJApEMA6libpAs54CXtRKN_e3YY_QjkZ1qZggp2bjB-awLu09aMZcyC_v4InRELfMluCgD7t0c_yj-MCT6b_jCT1HPZHaGKsc0EXNwYjVzYWlZCSdgpegDnMhDaZWvmNLoz5PibpBlrnOi2lS8lgOXAGPGbnomcYhQOibx8fofVbZ_gCpxy-uGfUBLv2G0UHGIHHTM7dupW5F7bYHpkaNzDLjVxTMKhXBFO2_vXdsspKANWd6r872HJoHbtf8qdyDeBqYI5oWwQmTFjrs9f9KFX-BKf8tOBtBF7NlP88PoWpCVtuifuHA8prVO1Rjt_SbRB9J_3i7qqERfa59eHd_JQsaQ&curl=https%3A%2F%2Fsin.creativecdn.com%2Fclicks%3F%7BEXTRA_CLICK_PARAMS%7D&tdc=sin`
];

document.addEventListener("DOMContentLoaded", () => {
    var r = Math.floor(Math.random() * urls.length);  
    var iframes = document.getElementsByClassName('juusannninadmanager');
    
    if (urls.length === 0) {
        console.error('URL配列が空です。');
        return;
    } else {
        console.log(r);
    }
    for(var i = 0; i < iframes.length; i++) {
        iframes[i].src = urls[r];
    }
});

setInterval (() => {
    r = Math.floor(Math.random() * urls.length);  
    iframes = document.getElementsByClassName('juusannninadmanager');
    
    if (urls.length === 0) {
        console.error('URL配列が空です。');
        return;
    } else {
        console.log(r);
    }
    for(i = 0; i < iframes.length; i++) {
        iframes[i].src = urls[r];
    }
}, 500000);
