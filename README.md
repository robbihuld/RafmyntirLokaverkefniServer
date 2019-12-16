# Lokaverkefni í Rafmyntum - SmileySearch

## Virkni
Lokaverkefnið mitt er fjarsjóðsleit. Notendur geta sótt appið smileySearch á play store (appið er í review og mun vera hægt að sækja það seinna í vikunni). Þar búa þeir til aðgang og geta hafið leit á broskalla fjarsjóðum. Notendur hafa tvo valmöguleika. Annars vega geta þeir beðið um leiðbeiningar að næsta fjarsjóð, gegn greiðslu broskalla, eða grafið eftir fjarsjóð. Ef notandinn er staddur í raunheimum þar sem fjarsjóður hefur verið grafinn getur hann hann sett inn veskisfangið sitt og fengið greitt boskallanna sem hann fann.

## Demo

í þessu myndbandi má sjá demo á hvernig appið virkar
https://www.youtube.com/watch?v=GXJHnQJxnQk&feature=youtu.be

## Uppbygging

Hér fyrir neðan má sjá hvernig kerfið er byggt upp í grófum dráttum. Við erum með appið sem er flutter app, sem þýðir að það getur bæði verið android og ios app. Hægt er að finna sourcinn af appinu hér: https://github.com/robbihuld/RafmyntirLokaverkefniApp. Appið talar við "heroku" serverinn í gegnum websocket. Heroku er þjónusta til að keyra servera í skýinu. Heroku serverinn er s.s. node.js server sem sér um alla leikjavirknina. Hann sér um að halda utan um notendur og fjarsjóði. Þær upplýsingar eru geymdar í postgres gagnagrunni sem Heroku serverinn talar við. Heroku serverinn sér líka um að tala við "veskis serverinn" sem er server sem geymir veskið mitt. Sá server (linux) er á tölvu heima hjá mér sem ég er búinn að portfowarda inná, svo að heroku serverinn getur talað við veskið. Hann gerir það í gegnum JSON-RPC client.Þegar notandi er búinn til, bý ég til nýja addressu í veskinu mínu og tengi það við notandann, þannig veit ég hvaða transaction á við hvaða notanda, til að gera það kleyft að margir geta notað appið í einu. Veskið mitt er síðan með walletnotify og sendir transactionid á serverinn með post request.  

![](https://github.com/robbihuld/RafmyntirLokaverkefniServer/blob/master/Capture.PNG)

## Hugleiðingar

Notendavirkni er í lámarki í þessu appi. Bara strengur. Það væri hægt að gera eitthvað meira með það og mögulega sýna hversu marga fjarsjóði notandi er búinn að fá. Líka væri sniðugt að leyfa notendum að grafa sína eigin fjarsjóði. Eins og stendur kostar alltaf það sama þegar notandi biður um leiðbeiningar að fjarsjóð og verðlaunin eru alltaf 100 broskallar. Þetta mætti breyta til að tryggja að húsið (ég) komi alltaf út í plús, en sé ekki að tapa brosköllum á þessum leik. Svo veit ég heldur ekki hvað gerist ef broskallarnir á veskinu mínu klárast. Ég þyrfti að höndla það einhvern vegin
