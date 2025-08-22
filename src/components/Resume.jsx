import React, { useRef } from 'react'
import './resume.css'

export default function Resume({ inModal = false }) {
  const sheetRef = useRef(null)

  const downloadPdf = async () => {
    const { jsPDF } = await import('jspdf')
    const html2canvas = (await import('html2canvas')).default

    const pdf = new jsPDF('p', 'pt', 'a4')
    const MARGIN = 36 // 0.5"
    const pageW = pdf.internal.pageSize.getWidth()
    const innerW = pageW - MARGIN * 2

    // Auto-paginate the real HTML (respects CSS page-breaks)
    await pdf.html(sheetRef.current, {
      html2canvas: {
        scale: 2,
        backgroundColor: '#ffffff',
        windowWidth: sheetRef.current.scrollWidth,
      },
      x: MARGIN,
      y: MARGIN,
      width: innerW,
      callback: (doc) => doc.save('Troy-Oubre-Resume.pdf'),
      autoPaging: 'text', // split on text lines when possible
    })
  }

  return (
    <div className={`resume-root ${inModal ? 'resume-in-modal' : ''}`} aria-label="Resume">
      {/* Toolbar */}
      <div className="resume-toolbar no-print">
        <button className="pill" onClick={downloadPdf}>Download PDF</button>
      </div>

      {/* The sheet we capture for the PDF */}
      <article ref={sheetRef} className="resume-sheet">
        <header className="resume-header">
          <h1 className="name">Troy Oubre</h1>
          <div className="meta">
            <span>Baton Rouge, LA</span>
            <span>•</span>
            <a href="tel:+15047150645">(504) 715-0645</a>
            <span>•</span>
            <a href="mailto:oubre1@att.net">oubre1@att.net</a>
            <span>•</span>
            <a href="https://troys-portfolio.netlify.app" target="_blank" rel="noreferrer">Portfolio</a>
            <span>•</span>
            <a href="https://github.com/tmoubre" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </header>

        <section>
          <h2>Professional Summary</h2>
          <p>
            Operations Controller with 15+ years of experience driving financial control, job costing, inventory
            accountability, and cross-functional execution. Recently completed a full-stack engineering program and
            built production-style apps (React, Node/Express, serverless PWA, React Native, Angular). Known for clear
            reporting, process rigor, and hands-on delivery.
          </p>
        </section>

        <section>
          <h2>Core Strengths</h2>
          <ul className="cols avoid-break">
            <li>Operations & Financial Control</li>
            <li>Budgeting & Forecasting</li>
            <li>Cost Analysis & Reporting</li>
            <li>KPI Development & Dashboards</li>
            <li>Project Accounting & Job Costing</li>
            <li>Strategic Planning & Execution</li>
            <li>Inventory & Asset Management</li>
            <li>Intercompany Accounting</li>
            <li>Internal Controls & Compliance</li>
            <li>Systems Implementation</li>
            <li>Vendor & Contract Management</li>
            <li>Cross-Functional Team Leadership</li>
          </ul>
        </section>

        {/* Force Experience to start on a new page if needed */}
        <div className="page-break" aria-hidden="true"></div>

        <section>
          <h2>Experience</h2>

          {/* BrandSafway — Operations Controller */}
          <div className="role avoid-break">
            <div className="role-head">
              <h3>Operations Controller</h3>
              <div className="right">
                <div>BrandSafway, LLC — Boutte, LA</div>
                <div>Mar 2021 – Present</div>
              </div>
            </div>
            <ul>
              <li>Oversee financial operations ($7M+), including budgeting, forecasting, and cost reporting.</li>
              <li>Perform monthly/quarterly balance-sheet reviews and variance analyses across operational accounts.</li>
              <li>Partner with leadership on branch/region performance reviews; identify gaps and corrective actions.</li>
              <li>Lead job-cost reviews and margin controls with project managers and estimators.</li>
              <li>Own month-end close: journals, accruals, capex tracking, and intercompany accounting.</li>
              <li>Deliver KPI dashboards and reports; support bid prep and exec presentations.</li>
              <li>Oversee timekeeping/job-tracking system integrity; validate POs and vendor invoices.</li>
            </ul>
          </div>

          {/* BrandSafway — Division Resource Manager / Office Manager */}
          <div className="role avoid-break">
            <div className="role-head">
              <h3>Division Resource Manager / Office Manager</h3>
              <div className="right">
                <div>BrandSafway, LLC — Boutte, LA</div>
                <div>Aug 2018 – Mar 2021</div>
              </div>
            </div>
            <ul>
              <li>Directed divisional billing, procurement, and resource allocation.</li>
              <li>Built reporting tools improving visibility to project and operational performance.</li>
              <li>Administered inventory controls for $30M–$100M in assets.</li>
              <li>Supervised a multi-functional team; standardized processes across departments.</li>
              <li>Negotiated supplier agreements and optimized purchasing terms.</li>
            </ul>
          </div>

          {/* Brand Energy & Infrastructure Services — Division Resource Manager */}
          <div className="role avoid-break">
            <div className="role-head">
              <h3>Division Resource Manager</h3>
              <div className="right">
                <div>Brand Energy & Infrastructure Services — LaPlace, LA</div>
                <div>2015 – 2018</div>
              </div>
            </div>
            <ul>
              <li>Directed inventory & logistics across multiple sites; managed $50M+ in assets.</li>
              <li>Led a 10–20 person team, improving efficiency, planning, and on-time delivery.</li>
              <li>Evaluated vendor contracts and drove cost-reduction initiatives.</li>
            </ul>
          </div>

          {/* Environmental Health & Safety Specialist */}
          <div className="role avoid-break">
            <div className="role-head">
              <h3>Environmental Health & Safety Specialist</h3>
              <div className="right">
                <div>Brand (various sites)</div>
                <div>2011 – 2015</div>
              </div>
            </div>
            <ul>
              <li>Coordinated regulatory compliance and safety audits; contributed to zero reportable incidents.</li>
              <li>Produced RCI reports; advised on root-cause analysis and risk mitigation.</li>
              <li>Monitored EHS metrics and recommended site-wide improvements.</li>
            </ul>
          </div>

          {/* Sci-Net — Field Supervisor */}
          <div className="role avoid-break">
            <div className="role-head">
              <h3>Field Supervisor</h3>
              <div className="right">
                <div>Sci-Net, LLC — Baton Rouge, LA</div>
                <div>Jun 2007 – Jul 2010</div>
              </div>
            </div>
            <ul>
              <li>Managed field operations and accurate inventory allocation/reporting.</li>
              <li>Conducted performance reviews; maintained customer satisfaction and support.</li>
              <li>Maintained infrastructure (DB/server performance and uptime).</li>
            </ul>
          </div>

          {/* Cox — Systems Support Specialist II */}
          <div className="role avoid-break">
            <div className="role-head">
              <h3>Systems Support Specialist II</h3>
              <div className="right">
                <div>Cox Communications — Baton Rouge, LA</div>
                <div>Jun 2001 – Jul 2007</div>
              </div>
            </div>
            <ul>
              <li>Built help-desk operations for VOIP/HSI; implemented escalation/resolution protocols.</li>
              <li>Provided troubleshooting, ticket analysis, and user training.</li>
              <li>Contributed to Unisys development efforts with end-user insights.</li>
            </ul>
          </div>
        </section>

        {/* Optional forced break before Education if overflow occurs on page 2 */}
        <div className="page-break" aria-hidden="true"></div>

        <section>
          <h2>Education & Certifications</h2>
          <ul className="flat avoid-break">
            <li><strong>Associate of Science, Computer Information Systems</strong> — ITI Technical College (Baton Rouge, LA)</li>
            <li><strong>Associate of Science, Computer Information Systems</strong> — Remington College (Baton Rouge, LA)</li>
          </ul>
          <p className="muted avoid-break">
            CSST • CSS • NCCER Safety • OSHA-10 & OSHA-30 • First Aid/CPR (Alliance Safety Council)
          </p>
        </section>
      </article>
    </div>
  )
}

