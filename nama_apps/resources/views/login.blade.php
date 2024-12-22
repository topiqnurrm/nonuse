@extends('layouts.auth')

@section('content')
<div class="row">
    <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
    <div class="col-lg-6 d-none d-lg-block" style="background-color: #f0eded;">
        <div class="p-5">
            <div class="text-center">
                <h1 class="h2 text-gray-900 mb-4" style="font-weight:bold !important;">LOGIN</h1>
            </div>
            <form class="user" action="{{ route('login') }}" method="post">
                @csrf
                <div class="form-group">
                    <input type="email" class="form-control form-control-user
                        @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}"
                        id="exampleInputEmail" aria-describedby="emailHelp"
                        placeholder="Enter Email Address...">
                    @error('email')
                        <span class="invalid-feedback" role="alert">
                          <strong>{{ $message }}</strong>
                        </span>
                      @enderror
                </div>
                <div class="form-group">
                    <input type="password" class="form-control form-control-user
                        @error('password') is-invalid @enderror" name="password"
                        id="exampleInputPassword" placeholder="Password">
                    @error('password')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
                <div class="form-group">
                    <div class="custom-control custom-checkbox small">
                        <input type="checkbox" name="remember" class="custom-control-input" id="customCheck">
                        <label class="custom-control-label" for="customCheck">Remember
                            Me</label>
                    </div>
                </div>
                <button class="btn btn-primary btn-user btn-block">
                    Login
                </button>
            </form>
            <hr>
            <div class="text-center">
                <a class="small" href="{{ route('register') }}">Daftar Di sini!</a>
            </div>
        </div>
    </div>
</div>
@endsection
