#!/usr/bin/perl
use strict;
use warnings;

use Term::ANSIColor qw(:constants);
$Term::ANSIColor::AUTORESET = 1;

$| = 1;

my %PREREQ;
my $result;
my $error;

#------------------------EDIT HERE-------------------------#
$PREREQ{'node.js'} = 'node';
$PREREQ{'npm'} = 'npm';
#------------------------STOP HERE-------------------------#

if (!&check_prereq(\%PREREQ)) {
    print BOLD YELLOW "\n  At least one prerequisite was not met. Please check your setup.\n";
    die;
}

if (!&check_hashish) {
    print BOLD RED "not found!\n";
    print BOLD CYAN "  :: "; print BOLD WHITE "Trying to install hashish...";

    if (!&install_hashish) {
        print BOLD RED "failed!\n";
        print BOLD YELLOW "\nInstallation of hashish failed, please check npm.install for error messages.";
        die;
    } else {
        print BOLD GREEN "succeeded!\n";
    }
} else {
    print BOLD GREEN "found!\n";
    print "\nYour setup looks complete, you can now run bin/nyssrad!\n";
    exit;
}



sub check_prereq
{
    my $prereq = shift;

    foreach (keys %{$prereq}) {
        print BOLD WHITE " :: " . $_ . "...\t\t\t\t";
        $result = `$prereq->{$_} --version &> /dev/null`;

        if (${^CHILD_ERROR_NATIVE} ne 0) {
            print BOLD RED "not found!\n";
            $error = 1;
        } else {
            print BOLD GREEN "found!\n";
        }
    }

    if ($error) {
        return undef;
        print BOLD YELLOW "  At least one prerequisite was not met. Please check your setup.\n";
    } else {
        return 1;
    }
}


sub check_hashish
{
    print BOLD WHITE " :: node.js module 'hashish'...\t\t";

    open(HANDLE, ">test.js");
    print HANDLE "require('hashish');";
    close(HANDLE);

    $result = `node test.js 2> /dev/null`;

    if (${^CHILD_ERROR_NATIVE} ne 0) {
        `rm test.js`;
        return undef;
    } else {
        `rm test.js`;
        return 1;
    }

}

sub install_hashish
{
    $result = `npm install hashish 2> npm.install`;

    if (${^CHILD_ERROR_NATIVE} ne 0) {
        return undef;
    } else {
        return 1;
    }
}

