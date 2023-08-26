using System;

namespace D12.ChatGPT.DataRepository.Interface
{
    public interface IUnitOfWork : IDisposable
    {
        int Complete();
    }
}
