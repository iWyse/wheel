(function () {
    const r = document.createElement("link").relList;
    if (r && r.supports && r.supports("modulepreload")) return;
    for (const e of document.querySelectorAll('link[rel="modulepreload"]')) n(e);
    new MutationObserver((e) => {
        for (const o of e) if (o.type === "childList") for (const u of o.addedNodes) u.tagName === "LINK" && u.rel === "modulepreload" && n(u);
    }).observe(document, { childList: !0, subtree: !0 });
    function c(e) {
        const o = {};
        return (
            e.integrity && (o.integrity = e.integrity),
            e.referrerpolicy && (o.referrerPolicy = e.referrerpolicy),
            e.crossorigin === "use-credentials" ? (o.credentials = "include") : e.crossorigin === "anonymous" ? (o.credentials = "omit") : (o.credentials = "same-origin"),
            o
        );
    }
    function n(e) {
        if (e.ep) return;
        e.ep = !0;
        const o = c(e);
        fetch(e.href, o);
    }
})();
$("#phone").mask("+7(999) 999-9999");
let f = "";
const s = [
        { text: "Подвесное кресло", color: "rgba(245, 245, 245, 1)", colorText: "#000" },
        { text: "Качели", color: "rgba(236, 55, 0, 1)", colorText: "#fff" },
        { text: "Гриль", color: "rgba(245, 245, 245, 1)", colorText: "#000" },
        { text: "Тандыр", color: "rgba(236, 55, 0, 1)", colorText: "#fff" },
        { text: "Световая фигура", color: "rgba(245, 245, 245, 1)", colorText: "#000" },
        { text: "Костровая чаша", color: "rgba(236, 55, 0, 1)", colorText: "#fff" },
        { text: "Кухоный остров", color: "rgba(245, 245, 245, 1)", colorText: "#000" },
        { text: "Уличный шкаф", color: "rgba(236, 55, 0, 1)", colorText: "#fff" },
    ],
    a = document.querySelector(".deal-wheel"),
    l = a.querySelector(".spinner"),
    p = document.querySelector(".btn-spin"),
    m = a.querySelector(".ticker"),
    L = document.querySelector(".info"),
    _ = document.querySelector(".button-wrapper"),
    q = document.querySelector(".prize-info"),
    d = document.querySelector(".form__input"),
    v = document.querySelector(".prize__input");
d.addEventListener("mouseover", () => {
    d.placeholder = "+7(___) ___-____";
});
d.addEventListener("mouseout", () => {
    d.placeholder = "Ваш номер телефона";
});
let y = 360 / s.length;
const z = Math.floor(180 / s.length),
    b = "is-spinning",
    x = "selected",
    T = window.getComputedStyle(l);
let S,
    i = 0,
    g = 0,
    h;
const A = () => {
        s.forEach(({ text: t, color: r, colorText: c, reaction: n }, e) => {
            const o = y * e * -1 - z + 180;
            l.insertAdjacentHTML(
                "beforeend",
                `<li class="prize" data-reaction=${n} style="--rotate: ${o}deg">
			<span class="text " style="color: ${c}">${t}</span>
		 </li>`
            );
        });
    },
    P = () => {
        l.setAttribute(
            "style",
            `background: conic-gradient(
		 from -90deg,
		 ${s.map(({ color: t }, r) => `${t} 0 ${(100 / s.length) * (s.length - r)}%`).reverse()}
	  );`
        );
    },
    k = () => {
        P(), A(), (h = a.querySelectorAll(".prize"));
    },
    E = (t, r) => ((t = Math.ceil(t)), (r = Math.floor(r)), Math.floor(Math.random() * (r - t + 1)) + t),
    M = () => {
        const t = T.transform.split("(")[1].split(")")[0].split(","),
            r = t[0],
            c = t[1];
        let n = Math.atan2(c, r);
        n < 0 && (n += 2 * Math.PI);
        const e = Math.round(n * (180 / Math.PI)),
            o = Math.floor(e / y);
        g !== o && ((m.style.animation = "none"), setTimeout(() => (m.style.animation = null), 10), (g = o)), (S = requestAnimationFrame(M));
    },
    w = () => {
        let t = Math.floor(i / y);
        h[t].classList.add(x),
            (f = s[t].text),
            (v.value = f),
            setTimeout(() => {
                (L.style.display = "flex"), (_.style.display = "none"), (q.textContent += f + "!");
            }, 1e3);
    };
p.addEventListener("click", () => {
    (p.disabled = !0), (i = Math.floor(Math.random() * 360 + E(2e3, 3e3))), h.forEach((t) => t.classList.remove(x)), a.classList.add(b), l.style.setProperty("--rotate", i), (m.style.animation = "none"), M();
});
l.addEventListener("transitionend", () => {
    cancelAnimationFrame(S), (i %= 360), w(), a.classList.remove(b), l.style.setProperty("--rotate", i), (p.disabled = !1);
});
k();
