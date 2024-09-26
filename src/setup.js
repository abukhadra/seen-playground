import {SeenEditor} from "/lib/sedit/v0.1.3/sedit.js"

const USER_ALLOWED_OPTS = ['lang', 'theme', 'examples']

const SAMPLE_EXAMPLE_AR = { 
    'السلام_عليكم' : [
        'السلام_عليكم', 
        `دل بدء {
            اطبع_سطر(«السلام عليكم!»)  
        }`
    ]
}
const SAMPLE_EXAMPLE_EN =   { 
    'hello_world' : [
        'hello_world', 
        `fn main { 
            println('hello world') 
        }`
    ]
}

const userOpts = window.opts

let opts = {
    lang: 'en',
    theme: 'light',
    examples : {    
        ar: SAMPLE_EXAMPLE_AR,
        en: SAMPLE_EXAMPLE_EN
    }
}

// FIXME: this does not handle the `examples` key properly, need to make a recursive version! 
Object.keys(userOpts).forEach(k => { 
    if (!USER_ALLOWED_OPTS.includes(k)) { throw new Error('invalid option: ' + k) }
    opts[k] = userOpts[k] 
  })

  // WORKAROUND FOR non-recursive:
  if(!opts.examples.ar) { opts.examples.ar = SAMPLE_EXAMPLE_AR}
  if(!opts.examples.en) { opts.examples.en = SAMPLE_EXAMPLE_EN}


let lang = opts.lang 


let EXAMPLES 

const inherited = 'rgb(200,150,106)'       

// const EDITOR_SRCDOC = SeenEditor(lang, document.querySelector('#editor'), {lang: lang})

document.querySelector('#lang').style.backgroundImage=`url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'%3e%3c!--!Font%20Awesome%20Free%206.6.0%20by%20@fontawesome%20-%20https://fontawesome.com%20License%20-%20https://fontawesome.com/license/free%20Copyright%202024%20Fonticons,%20Inc.--%3e%3cpath%20fill='${inherited}'%20d='M352%20256c0%2022.2-1.2%2043.6-3.3%2064l-185.3%200c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6%203.3-64l185.3%200c2.2%2020.4%203.3%2041.8%203.3%2064zm28.8-64l123.1%200c5.3%2020.5%208.1%2041.9%208.1%2064s-2.8%2043.5-8.1%2064l-123.1%200c2.1-20.6%203.2-42%203.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7%200c-10-63.9-29.8-117.4-55.3-151.6c78.3%2020.7%20142%2077.5%20171.9%20151.6zm-149.1%200l-176.6%200c6.1-36.4%2015.5-68.6%2027-94.7c10.5-23.6%2022.2-40.7%2033.5-51.5C239.4%203.2%20248.7%200%20256%200s16.6%203.2%2027.8%2013.8c11.3%2010.8%2023%2027.9%2033.5%2051.5c11.6%2026%2020.9%2058.2%2027%2094.7zm-209%200L18.6%20160C48.6%2085.9%20112.2%2029.1%20190.6%208.4C165.1%2042.6%20145.3%2096.1%20135.3%20160zM8.1%20192l123.1%200c-2.1%2020.6-3.2%2042-3.2%2064s1.1%2043.4%203.2%2064L8.1%20320C2.8%20299.5%200%20278.1%200%20256s2.8-43.5%208.1-64zM194.7%20446.6c-11.6-26-20.9-58.2-27-94.6l176.6%200c-6.1%2036.4-15.5%2068.6-27%2094.6c-10.5%2023.6-22.2%2040.7-33.5%2051.5C272.6%20508.8%20263.3%20512%20256%20512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3%20352c10%2063.9%2029.8%20117.4%2055.3%20151.6C112.2%20482.9%2048.6%20426.1%2018.6%20352l116.7%200zm358.1%200c-30%2074.1-93.6%20130.9-171.9%20151.6c25.5-34.2%2045.2-87.7%2055.3-151.6l116.7%200z'/%3e%3c/svg%3e")`        

selectLang()   

function setLangOptions(lang) {

    const langOptions = document.querySelector('#lang')
    langOptions.replaceChildren()
    const arOpt = document.createElement('option') ; arOpt.value='ar'
    const enOpt = document.createElement('option') ; enOpt.value='en'

    if(lang === 'ar') { 
        arOpt.textContent = 'عربي' ; langOptions.appendChild(arOpt)
        enOpt.textContent = 'En - انجليزي' ; langOptions.appendChild(enOpt)
        langOptions.value='ar';
    } else {
        enOpt.textContent = 'English' ; langOptions.appendChild(enOpt); 
        arOpt.textContent = 'Arabic عربي' ; langOptions.appendChild(arOpt)
        langOptions.value='en';
    }
}

function selectLang() {
    lang= document.querySelector('#lang').value || lang
    EXAMPLES = lang === 'ar'? opts.examples.ar : opts.examples.en
    const editor_container = document.querySelector('#editor-container')
    editor_container.replaceChildren()
    SeenEditor("seen-editor", editor_container, {
        lang: lang,
        theme: opts.theme
    })
    setLangOptions(lang)
    setExamples(lang)
    if(lang === 'ar') { 
        document.querySelector('#example_label').textContent = 'مثال'
        options.setAttribute("dir", 'rtl') 
    } else { 
        document.querySelector('#example_label').textContent = 'Example'
        options.setAttribute("dir", 'ltr') 
    }
}        

function setExamples(lang) {
    const examples = document.querySelector('#examples')
    examples.replaceChildren()
    Object.keys(EXAMPLES).forEach((k,i) => {
        const example = document.createElement('option') 
        example.style.fontSize = '15px'
        example.value = k
        example.textContent = EXAMPLES[k][0]
        examples.appendChild(example)
        if(i === 0) { examples.value=k}
    })
}

function selectExample() {
    let k = document.querySelector('#examples').value 
    const code = EXAMPLES[k][1]
    const editor = document.querySelector('#editor-container> #seen-editor')
    const editor_win = editor.contentWindow || editor
    editor_win.setEditorValue(code)
    editor_win.hidePreview()
    editor_win.hideRightSide()
    editor_win.resetOutput()
}

export function setEditorTheme(name) {
    editor_win.setTheme(name)
}

document.querySelector('#lang').addEventListener('change', () => selectLang());
document.querySelector('#examples').addEventListener('change', () => selectExample());
