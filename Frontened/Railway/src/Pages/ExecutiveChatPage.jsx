import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, User } from 'lucide-react';

const ExecutiveChatPage = () => {
    const [searchParams] = useSearchParams();
    const [userMessage, setUserMessage] = useState('');
    const [replyText, setReplyText] = useState('');
    const [status, setStatus] = useState('Waiting for connection...');
    const channelName = 'executive_chat_channel';

    useEffect(() => {
        const msg = searchParams.get('msg');
        if (msg) {
            setUserMessage(msg);
            setStatus('Message received');
        } else {
            setStatus('No message provided in URL');
        }
    }, [searchParams]);

    const handleSendReply = (e) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        const bc = new BroadcastChannel(channelName);
        bc.postMessage({ type: 'EXECUTIVE_REPLY', text: replyText });
        bc.close();
        
        setStatus(`Replied: "${replyText}"`);
        setReplyText('');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                <div className="bg-[#008BD0] p-4 text-white">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <User className="w-6 h-6" /> Executive Interface
                    </h1>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">User Message</label>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-800">
                            {userMessage || <span className="text-gray-400 italic">No message content found...</span>}
                        </div>
                    </div>

                    <form onSubmit={handleSendReply} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Your Reply</label>
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Type your reply here..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008BD0] focus:border-transparent outline-none h-32 resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!replyText.trim()}
                            className="w-full bg-[#008BD0] text-white py-2 px-4 rounded-lg hover:bg-[#0077b3] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-4 h-4" /> Send Reply
                        </button>
                    </form>

                    <div className="text-center text-sm text-gray-500 border-t pt-4">
                        Status: <span className="font-medium text-[#008BD0]">{status}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExecutiveChatPage;
