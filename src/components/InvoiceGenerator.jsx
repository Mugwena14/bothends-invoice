import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Download, FileText, Plus, Trash2 } from 'lucide-react';
import InvoiceTemplate from './InvoiceTemplate';

const InvoiceGenerator = () => {
  const [data, setData] = useState({
     clientName: '',
    clientEmail: '',
    caseRef: '',
    items: [{ description: '', amount: '' }],
    total: 0
  });

  const addItem = () => setData({ ...data, items: [...data.items, { description: '', amount: '' }] });
  
  const removeItem = (index) => {
    const newItems = data.items.filter((_, i) => i !== index);
    setData({ ...data, items: newItems, total: calculateTotal(newItems) });
  };

  const calculateTotal = (items) => items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  const updateItem = (index, field, value) => {
    const newItems = [...data.items];
    newItems[index][field] = value;
    setData({ ...data, items: newItems, total: calculateTotal(newItems) });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-3 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Responsive Header */}
        <header className="mb-6 md:mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <h1 className="flex items-center gap-3 text-2xl md:text-3xl font-black tracking-tight text-mkh-blue">
            <FileText className="size-6 md:size-8" /> BothEnds Invoicer
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Internal Billing Portal</p>
        </header>

        {/* Main Card - Adjusted padding for mobile */}
        <div className="grid gap-6 rounded-xl md:rounded-2xl bg-white p-5 md:p-8 shadow-xl ring-1 ring-slate-200">
          
          {/* Client Details - Stacked on mobile, Grid on desktop */}
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500">Client Details</label>
              <input 
                placeholder="Full Name" 
                className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-hidden focus:ring-2 focus:ring-mkh-cyan"
                onChange={(e) => setData({...data, clientName: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500">Reference</label>
              <input 
                placeholder="Case Ref #" 
                className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-hidden focus:ring-2 focus:ring-mkh-cyan"
                onChange={(e) => setData({...data, caseRef: e.target.value})}
              />
            </div>
          </section>

          {/* Billing Items - The core responsive fix */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-50 pb-2">Billing Items</h3>
            
            <div className="space-y-4 md:space-y-3">
              {data.items.map((item, index) => (
                <div key={index} className="relative flex flex-col md:flex-row gap-3 p-4 md:p-0 bg-slate-50 md:bg-transparent rounded-xl md:rounded-none animate-in fade-in slide-in-from-left-2">
                  
                  {/* Service Input - Full width on mobile */}
                  <input 
                    placeholder="Service description..." 
                    className="flex-1 rounded-lg border border-slate-200 bg-white p-3 text-sm outline-hidden focus:ring-2 focus:ring-mkh-cyan"
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                  />
                  
                  <div className="flex items-center gap-2">
                    {/* Amount Input */}
                    <div className="relative flex-1 md:flex-none">
                      <span className="absolute left-3 top-3 text-slate-400 text-sm">R</span>
                      <input 
                        type="number" 
                        placeholder="0.00" 
                        className="w-full md:w-32 rounded-lg border border-slate-200 bg-white p-3 pl-7 text-sm outline-hidden focus:ring-2 focus:ring-mkh-cyan"
                        onChange={(e) => updateItem(index, 'amount', e.target.value)}
                      />
                    </div>

                    {/* Trash Button - Mobile: Inline with amount | Desktop: End of row */}
                    <button 
                      onClick={() => removeItem(index)} 
                      className="rounded-lg p-3 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors bg-white md:bg-transparent border border-slate-200 md:border-none shadow-sm md:shadow-none"
                      title="Remove item"
                    >
                      <Trash2 size={18}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={addItem} 
              className="group mt-2 flex items-center gap-2 text-sm font-bold text-mkh-cyan hover:text-mkh-blue transition-colors"
            >
              <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add another service
            </button>
          </section>

          {/* Footer - Stacked on mobile */}
          <footer className="mt-4 flex flex-col items-center justify-between gap-6 border-t border-slate-100 pt-6 md:mt-6 md:flex-row md:pt-8">
            <div className="text-center md:text-left">
              <p className="text-[10px] md:text-sm text-slate-500 uppercase font-bold tracking-widest">Total Amount Due</p>
              <p className="text-3xl md:text-4xl font-black text-mkh-blue">R {data.total.toLocaleString()}</p>
            </div>
            
            <PDFDownloadLink 
              document={<InvoiceTemplate data={data} />} 
              fileName={`BothEnds${data.clientName || 'Invoice'}.pdf`}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-mkh-blue px-6 py-4 md:px-8 text-sm md:text-base font-bold text-white shadow-lg shadow-mkh-blue/20 hover:bg-mkh-cyan transition-all active:scale-95 md:w-auto"
            >
              <Download size={20}/> Download Invoice
            </PDFDownloadLink>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;