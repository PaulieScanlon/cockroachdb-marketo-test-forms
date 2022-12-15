// import { useState, useEffect } from 'react'

// const baseUrl = `//${process.env.NEXT_PUBLIC_BASE_URL}`
// const munchkinId = process.env.NEXT_PUBLIC_MUNCHKIN_ID

// const loadMarketoScript = (setScriptLoaded) => {
//   if (window.MktoForms2) return setScriptLoaded(true)
//   const script = document.createElement(`script`)
//   script.defer = true
//   script.onload = () => (window?.MktoForms2 ? setScriptLoaded(true) : null)
//   script.src = `//${process.env.NEXT_PUBLIC_BASE_URL}/js/forms2/js/forms2.min.js`
//   document.head.appendChild(script)
// }

// const useMarketo = ({ formId, callback }) => {
//   const [scriptLoaded, setScriptLoaded] = useState(false)
//   const [formLoaded, setFormLoaded] = useState(false)

//   useEffect(() => {
//     if (scriptLoaded) {
//       if (!formLoaded) {
//         MktoForms2.setOptions({
//           formXDPath: `/rs/${munchkinId}/images/marketo-xdframe-relative.html`
//         })
//         MktoForms2.loadForm(baseUrl, munchkinId, formId, callback)
//         setFormLoaded(true)
//       }
//     } else {
//       loadMarketoScript(setScriptLoaded)
//     }
//   }, [scriptLoaded])
// }

// export default useMarketo

// https://github.com/charliedieter/react-marketo-hook

import { useState, useEffect } from 'react'

const appendScript = (baseUrl, setScriptLoaded) => {
  if (window.MktoForms2) return setScriptLoaded(true)

  const script = document.createElement('script')
  script.src = `${process.env.NEXT_PUBLIC_BASE_URL}/js/forms2/js/forms2.min.js`
  script.onload = () => (window.MktoForms2 ? setScriptLoaded(true) : null)
  document.body.appendChild(script)
}

const useMarketo = ({ baseUrl, munchkinId, formId, callback }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    if (scriptLoaded) {
      window.MktoForms2.loadForm(baseUrl, munchkinId, formId, callback)
      return
    }
    appendScript(baseUrl, setScriptLoaded)
  }, [scriptLoaded, baseUrl, munchkinId, formId, callback])
}

export default useMarketo