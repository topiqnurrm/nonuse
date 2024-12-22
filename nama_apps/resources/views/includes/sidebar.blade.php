<ul class="navbar-nav bg-gradient-info sidebar sidebar-dark accordion" id="accordionSidebar">
    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="{{ route('home') }}">
        <div class="sidebar-brand-icon rotate-n-180">
            <img style="width: 35%;" src="{{ asset('img/login-logo.png') }}">
        </div>        
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0">

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
        <a class="nav-link" href="{{ route('home') }}">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></a>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Heading -->    
    <div class="sidebar-heading">
        Kredensial
    </div>
    <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseOne"
            aria-expanded="true" aria-controls="collapseOne">
            <i class="fas fa-fw fa-user-lock"></i>
            <span>Manajemen Data</span>
        </a>
        <div id="collapseOne" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">            
            <div class="bg-white py-2 collapse-inner rounded">
                <h6 class="collapse-header">Daftar Menu:</h6>
                <a class="collapse-item" href="">Menu 1</a>
                <a class="collapse-item" href="">Menu 2</a>
                <a class="collapse-item" href="">Menu 3</a>
            </div>            
        </div>
    </li>     
    <hr class="sidebar-divider d-none d-md-block">
    <div class="sidebar-heading">
        Main
    </div>
    <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseDataMaster"
            aria-expanded="true" aria-controls="collapseDataMaster">                
            <i class="fa fa-solid fa-folder"></i>
            <span>Data Master</span>
        </a>
        <div id="collapseDataMaster" class="collapse" aria-labelledby="headingDataMaster" data-parent="#accordionSidebarDataMaster">
            <div class="bg-white py-2 collapse-inner rounded">
                <h6 class="collapse-header">Daftar Menu:</h6>
                <a class="collapse-item" href="#"><i class="fa fa-solid fa-file"></i></i> Menu 1</a>
                <a class="collapse-item" href="#"><i class="fa fa-solid fa-file"></i></i> Menu 2</a>
                <a class="collapse-item" href="#"><i class="fa fa-solid fa-file"></i></i> Menu 3</a>
                <a class="collapse-item" href="#"><i class="fa fa-solid fa-file"></i></i> Menu 4</a>                
            </div>
        </div>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="https://unimma.ac.id/" target="_blank">                
            <i class="fa fa-fw fa-solid fa-book"></i>
            <span>Menu 1</span></a>
    </li>    
    <li class="nav-item">
        <a class="nav-link" href="{{ route('logout') }}">
            <i class="fas fa-fw fa-sign-out-alt"></i>
            <span>Logout</span></a>
    </li>    
    <!-- Divider -->
    {{-- <hr class="sidebar-divider d-none d-md-block"> --}}

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>

</ul>