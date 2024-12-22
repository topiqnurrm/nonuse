<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">
        @yield('title')
        <link rel="stylesheet" href="{{ asset('plugins/datatables/dataTables.bootstrap4.css') }}">
        <link href="{{ asset('vendor/fontawesome-free/css/all.min.css') }}" rel="stylesheet" type="text/css">
        <link href="{{ asset('vendor/font-awesome/css/font-awesome.min.css') }}" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
        <link href="{{ asset('css/sb-admin-2.min.css') }}" rel="stylesheet">
        <script src="{{ asset('vendor/jquery/jquery.min.js') }}"></script>
        <link rel="stylesheet" href="{{ asset('css/style.css') }}">
        <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
        {{-- <style>
            body {
                font-family: 'Poppins';
                font-size: 10px;
            }
        </style> --}}
        @yield('cssAdded')
    </head>
    <body id="page-top">
        {{-- @include('sweetalert::alert') --}}
        @guest
            @yield('content')
        @else
            <div id="wrapper">
                @include ('includes.sidebar')
                <div id="content-wrapper" class="d-flex flex-column">
                    <div id="content">
                        @include ('includes.navbar')                        
                        @yield('content')                        
                    </div>
                    @include ('includes.footer')
                </div>
            </div>
            <a class="scroll-to-top rounded" href="#page-top">
                <i class="fas fa-angle-up"></i>
            </a>
        @endguest
        <script src="{{ asset('vendor/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
        <script src="{{ asset('vendor/jquery-easing/jquery.easing.min.js') }}"></script>
        <script src="{{ asset('js/sb-admin-2.min.js') }}"></script>
        @yield('jsAdded')
    </body>
</html>
