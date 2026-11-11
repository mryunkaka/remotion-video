import json,re
al=json.load(open("docs/alignment.json"))
def A(unit,word=0,end=False):
    for u in al:
        if unit.lower() in u["text"].lower():
            ws=u["words"]
            if isinstance(word,str):
                for w in ws:
                    if word.lower() in w["w"].lower(): return w["e" if end else "s"]
                raise KeyError(word)
            return ws[word]["e" if end else "s"]
    raise KeyError(unit)
anchors=dict(
 hook=0.3, title2=2.7, pernah=A("Pernah"), janji=A("bagaimana jika"),
 bukan=A("Bukan janji"), melainkan=A("Melainkan"), penguasa=A("Melainkan","penguasa"),
 mustahil=A("Kedengarannya"), legenda=A("Namun, begitulah"), kotabaru=A("Namun, begitulah","Kotabaru"),
 kisah=A("Kisah ini"), datu=A("Kisah ini","Datu"),
 bertapa=A("Konon, dahulu","bertapa"), kekayaan=A("Ia tidak meminta","kekayaan,"),
 sederhana=A("Permintaannya"), ingin=A("Ia hanya ingin"), 
 namun=A("Namun, di tengah"), tibatiba=A("Namun, di tengah","tiba-tiba"), todak=A("Namun, di tengah","ikan"), raksasa=A("Namun, di tengah","raksasa!"),
 menyerang=A("Makhluk laut","menyerang"),
 pecah=A("Pertarungan","pecah!"), seranganA=A("Serangan demi"), seranganB=A("Serangan demi",2),
 dikalahkan=A("Hingga akhirnya, ikan","dikalahkan."), tetapi=A("Tetapi,"),
 tidakmembunuh=A("Datu Mabrur tidak","tidak"), mengobati=A("Ia malah","mengobati"), melepaskan=A("Ia malah","melepaskannya"),
 raja=A("Sang Raja"), hadiah=A("Sebagai balasan","hadiah."), tahukah=A("Dan tahukah"), diminta=A("Dan tahukah","diminta"),
 tetapmeminta=A("Ia tetap meminta"), sebuahpulau=A("Sebuah pulau untuk"),
 memanggil=A("Konon, Raja","memanggil"), mengangkat=A("Konon, Raja","mengangkat"),
 hingga=A("Hingga akhirnya, muncullah"), muncullah=A("Hingga akhirnya, muncullah","muncullah"), pulauhalimun=A("Hingga akhirnya, muncullah","Halimun,"), dikaitkan=A("Hingga akhirnya, muncullah","dikaitkan"),
 saijaan=A("Dari semangat","Saijaan,"), semboyan=A("Dari semangat","semboyan"), tentu=A("Tentu,"),
 renungkan=A("Namun, ada satu"), jika=A("Jika sebuah pulau dalam"), bagaimana=A("Bagaimana menurut"), komentar=A("Bagaimana menurut","komentar!"),
 dan=A("Dan kalau"), jangan=A("Jangan lupa"), like=A("Jangan lupa","LIKE,"), follow=A("Jangan lupa","FOLLOW"), share=A("Jangan lupa","SHARE"),
 karena=A("Karena siapa"), legendaberikut=A("legenda berikutnya"), terang=A("Terang Bulan"), mengungkap=A("Mengungkap Cerita"),
 end=148.99)
json.dump({k:round(v,3) for k,v in anchors.items()},open("src/data/anchors.json","w"),indent=1)
print({k:round(v,2) for k,v in anchors.items()})
